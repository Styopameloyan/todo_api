"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const create_1 = require("./hooks/create");
const update_1 = require("./hooks/update");
const Schema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    createUser: String,
    updateUser: String,
    updateDate: Date,
    createDate: Date,
    label: String,
    description: String,
    icon: String,
    url: String,
    divider: Boolean,
    newWindow: Boolean,
    sortIndex: Number,
    props: Array,
    baseRole: Array,
    moduleRoles: Array,
    flags: Array,
}).pre("save", create_1.createHook).pre("findOneAndUpdate", update_1.updateHook);
exports.default = mongoose_1.default.model("TaskTree", Schema);
//# sourceMappingURL=TaskTree.js.map