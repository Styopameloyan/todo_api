"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModel = exports.ToDoSchema = void 0;
const sequelize_1 = require("sequelize");
const connectDatabase_1 = require("../../connections/connectDatabase");
// Hooks
const beforeCreate_1 = require("../hooks/base/beforeCreate");
const beforeUpdate_1 = require("../hooks/base/beforeUpdate");
const beforeBulkUpdate_1 = require("../hooks/base/beforeBulkUpdate");
class ToDoSchema extends sequelize_1.Model {
}
exports.ToDoSchema = ToDoSchema;
const initModel = () => {
    ToDoSchema.init({
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: sequelize_1.DataTypes.STRING
        },
        status: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        assignee: {
            type: sequelize_1.DataTypes.STRING,
        },
        // Standard Felder
        rowid: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        createUser: {
            type: sequelize_1.DataTypes.STRING
        },
        updateUser: {
            type: sequelize_1.DataTypes.STRING
        },
        updateDate: {
            type: sequelize_1.DataTypes.DATE
        },
        createDate: {
            type: sequelize_1.DataTypes.DATE
        },
    }, {
        freezeTableName: true,
        timestamps: false,
        tableName: "TODO",
        sequelize: connectDatabase_1.sequelize,
        hooks: {
            beforeBulkUpdate: beforeBulkUpdate_1.beforeBulkUpdate,
            beforeUpdate: beforeUpdate_1.beforeUpdate,
            beforeCreate: beforeCreate_1.beforeCreate,
        }
    });
};
exports.initModel = initModel;
exports.default = ToDoSchema;
//# sourceMappingURL=TODO.js.map