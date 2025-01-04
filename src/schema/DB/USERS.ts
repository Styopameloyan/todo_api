
import * as bcrypt from 'bcrypt';
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../connections/connectDatabase';

// Hooks
import { beforeCreate } from '../hooks/base/beforeCreate';
import { beforeUpdate } from '../hooks/base/beforeUpdate';
import { beforeBulkUpdate } from '../hooks/base/beforeBulkUpdate';

export interface User {

    mail?: string;
    password?: string;
    displayName?: string;

    updateDate?: Date;
    createDate?: Date;
}
export class UserSchema extends Model<User> { }
export const initModel = () => {
    UserSchema.init({
        mail: { type: DataTypes.STRING, primaryKey: true },
        displayName: { type: DataTypes.STRING },

        updateDate: { type: DataTypes.DATE },
        createDate: { type: DataTypes.DATE },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value: string) {
                const saltRounds = 10;
                const hashedPassword = bcrypt.hashSync(value, saltRounds);
                this.setDataValue('password', hashedPassword);
            },
        },
    },
        {
            freezeTableName: true,
            timestamps: false,
            tableName: "USERS",
            sequelize,
            hooks: {
                beforeBulkUpdate: beforeBulkUpdate,
                beforeUpdate: beforeUpdate,
                beforeCreate: beforeCreate,
            }
        });
}

export default UserSchema;

























