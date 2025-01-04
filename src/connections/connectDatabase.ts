import { Options as SequelizeOptions, Sequelize } from "sequelize";
import config from "config";
import * as winston from "winston";
import getSchemaClasses from "../schema/initSchemas";
import { associations } from "../schema/associations";

let sequelize: Sequelize;
const connect = async (): Promise<void> => {
    try {
        const database: SequelizeOptions = config.get("database");
        sequelize = new Sequelize({ ...database });
        await sequelize.authenticate();

        const { initModels } = await getSchemaClasses();
        initModels.forEach((init: Function) => init());
        associations.forEach((init: Function) => init());

        console.log(`${String(database.dialect).toUpperCase()} --> Database-Connection: Success`);
    } catch (error) {
        winston.error("Database-Connection: " + error.message);
        process.exit(1);
    }
    return Promise.resolve();
}

export default connect;
export { sequelize }