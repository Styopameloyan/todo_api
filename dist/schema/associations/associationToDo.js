"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.associationToDo = void 0;
const USERS_1 = __importDefault(require("../DB/USERS"));
const TODO_1 = __importDefault(require("../DB/TODO"));
const associationToDo = () => {
    TODO_1.default.hasOne(USERS_1.default, {
        sourceKey: "createUser",
        foreignKey: "mail",
        as: "creator",
    });
    TODO_1.default.hasOne(USERS_1.default, {
        sourceKey: "updateUser",
        foreignKey: "mail",
        as: "updater"
    });
    TODO_1.default.hasOne(USERS_1.default, {
        sourceKey: "assignee",
        foreignKey: "mail",
        as: "assigneed"
    });
};
exports.associationToDo = associationToDo;
//# sourceMappingURL=associationToDo.js.map