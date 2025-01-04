import * as fs from "fs";
import * as path from "path";

const models: Object = {};
const initModels: Function[] = [];

const getSchemaClasses = async (): Promise<{ models: any, initModels: any }> => {

    const pathController: string[] = fs.readdirSync(path.resolve(__dirname, "DB"));

    for (const item of pathController) {
        const name = item.replace(".ts", "").replace(".js", "");

        if (name.includes(".") || name.includes(" ")) continue;

        const model = await import(path.resolve(__dirname, "DB", name));

        models[name] = model.default;
        initModels.push(model.initModel)
    }

    return { models, initModels };
}

export { models }
export default getSchemaClasses;