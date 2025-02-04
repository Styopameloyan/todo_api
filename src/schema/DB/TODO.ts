
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../connections/connectDatabase';

// Hooks
import { beforeCreate } from '../hooks/base/beforeCreate';
import { beforeUpdate } from '../hooks/base/beforeUpdate';
import { beforeBulkUpdate } from '../hooks/base/beforeBulkUpdate';

export interface ToDo {
    title?: string;
    description?: string;
    status?: string;
    assignee?: string; // Zugewisene person


    // Standard Felder
    rowid?: string;
    createUser?: string;
    updateUser?: string;
    updateDate?: Date;
    createDate?: Date;

}
export class ToDoSchema extends Model<ToDo> { }
export const initModel = () => {
    ToDoSchema.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        assignee: {
            type: DataTypes.STRING,
        },


        // Standard Felder
        rowid: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        createUser: {
            type: DataTypes.STRING
        },
        updateUser: {
            type: DataTypes.STRING
        },
        updateDate: {
            type: DataTypes.DATE
        },
        createDate: {
            type: DataTypes.DATE
        },

    },
        {
            freezeTableName: true,
            timestamps: false,
            tableName: "TODO",
            sequelize,
            hooks: {
                beforeBulkUpdate: beforeBulkUpdate,
                beforeUpdate: beforeUpdate,
                beforeCreate: beforeCreate,

            }
        });
}

export default ToDoSchema;


























