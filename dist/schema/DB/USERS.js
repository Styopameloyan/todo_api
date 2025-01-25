"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModel = exports.UserSchema = void 0;
const bcrypt = __importStar(require("bcrypt"));
const sequelize_1 = require("sequelize");
const connectDatabase_1 = require("../../connections/connectDatabase");
// Hooks
const beforeCreate_1 = require("../hooks/base/beforeCreate");
const beforeUpdate_1 = require("../hooks/base/beforeUpdate");
const beforeBulkUpdate_1 = require("../hooks/base/beforeBulkUpdate");
class UserSchema extends sequelize_1.Model {
}
exports.UserSchema = UserSchema;
const initModel = () => {
    UserSchema.init({
        mail: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
        displayName: { type: sequelize_1.DataTypes.STRING },
        updateDate: { type: sequelize_1.DataTypes.DATE },
        createDate: { type: sequelize_1.DataTypes.DATE },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            set(value) {
                const saltRounds = 10;
                const hashedPassword = bcrypt.hashSync(value, saltRounds);
                this.setDataValue('password', hashedPassword);
            },
        },
    }, {
        freezeTableName: true,
        timestamps: false,
        tableName: "USERS",
        sequelize: connectDatabase_1.sequelize,
        hooks: {
            beforeBulkUpdate: beforeBulkUpdate_1.beforeBulkUpdate,
            beforeUpdate: beforeUpdate_1.beforeUpdate,
            beforeCreate: beforeCreate_1.beforeCreate,
        }
    });
};
exports.initModel = initModel;
exports.default = UserSchema;
//# sourceMappingURL=USERS.js.map