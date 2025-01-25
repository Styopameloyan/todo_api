"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModel = exports.CommentSchema = void 0;
const sequelize_1 = require("sequelize");
const connectDatabase_1 = require("../../connections/connectDatabase");
// Hooks
const beforeCreate_1 = require("../hooks/base/beforeCreate");
const beforeUpdate_1 = require("../hooks/base/beforeUpdate");
const beforeBulkUpdate_1 = require("../hooks/base/beforeBulkUpdate");
class CommentSchema extends sequelize_1.Model {
}
exports.CommentSchema = CommentSchema;
const initModel = () => {
    CommentSchema.init({
        reference: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        referenceCreateUser: {
            type: sequelize_1.DataTypes.STRING
        },
        className: {
            type: sequelize_1.DataTypes.STRING
        },
        value: {
            type: sequelize_1.DataTypes.STRING
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
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        tableName: "COMMENT",
        sequelize: connectDatabase_1.sequelize,
        hooks: {
            beforeBulkUpdate: beforeBulkUpdate_1.beforeBulkUpdate,
            beforeUpdate: beforeUpdate_1.beforeUpdate,
            beforeCreate: beforeCreate_1.beforeCreate,
        }
    });
};
exports.initModel = initModel;
exports.default = CommentSchema;
//# sourceMappingURL=COMMENT.js.map