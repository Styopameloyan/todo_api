"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModel = exports.FileSchema = void 0;
const sequelize_1 = require("sequelize");
const connectDatabase_1 = require("../../connections/connectDatabase");
// Hooks
const beforeCreate_1 = require("../hooks/base/beforeCreate");
const beforeUpdate_1 = require("../hooks/base/beforeUpdate");
const beforeBulkUpdate_1 = require("../hooks/base/beforeBulkUpdate");
class FileSchema extends sequelize_1.Model {
}
exports.FileSchema = FileSchema;
const initModel = () => {
    FileSchema.init({
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        path: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        reference: {
            type: sequelize_1.DataTypes.STRING
        },
        type: {
            type: sequelize_1.DataTypes.STRING
        },
        size: {
            type: sequelize_1.DataTypes.DECIMAL(15, 3)
        },
        className: {
            type: sequelize_1.DataTypes.STRING
        },
        department: {
            type: sequelize_1.DataTypes.STRING
        },
        company: {
            type: sequelize_1.DataTypes.STRING
        },
        public: {
            type: sequelize_1.DataTypes.DECIMAL(2, 0),
            get() { return Boolean(Number(this.getDataValue("public"))); },
            set(value) { this.setDataValue('public', Number(value)); }
        },
        share: {
            type: sequelize_1.DataTypes.STRING
        },
        title: {
            type: sequelize_1.DataTypes.STRING
        },
        description: {
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
        tableName: "FILE",
        sequelize: connectDatabase_1.sequelize,
        hooks: {
            beforeBulkUpdate: beforeBulkUpdate_1.beforeBulkUpdate,
            beforeUpdate: beforeUpdate_1.beforeUpdate,
            beforeCreate: beforeCreate_1.beforeCreate,
        }
    });
};
exports.initModel = initModel;
exports.default = FileSchema;
//# sourceMappingURL=FILE.js.map