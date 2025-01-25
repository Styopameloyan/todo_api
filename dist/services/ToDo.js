"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDoService = void 0;
const NotFoundError_1 = require("../errorHandler/NotFoundError");
const TODO_1 = __importDefault(require("../schema/DB/TODO"));
const USERS_1 = __importDefault(require("../schema/DB/USERS"));
class ToDoService extends TODO_1.default {
    static _create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield TODO_1.default.create(data);
            return this._read(result.dataValues.rowid);
        });
    }
    static _read(rowid) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { rowid: rowid };
            const item = yield TODO_1.default.findOne({
                where: filter,
                include: [
                    { model: USERS_1.default, as: "creator", attributes: { exclude: ['password'] } },
                    { model: USERS_1.default, as: "updater", attributes: { exclude: ['password'] } },
                    { model: USERS_1.default, as: "assigneed", attributes: { exclude: ['password'] } },
                ]
            });
            if (!item)
                throw new NotFoundError_1.NotFoundError("Item not found: " + rowid);
            return item;
        });
    }
    static _update(data, rowid) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this._read(rowid);
            const result = yield item.update(data);
            return this._read(result.dataValues.rowid);
        });
    }
    static _find(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield TODO_1.default.findAll({
                where: Object.assign({}, filter),
                include: [
                    { model: USERS_1.default, as: "creator", attributes: { exclude: ['password'] } },
                    { model: USERS_1.default, as: "updater", attributes: { exclude: ['password'] } },
                    { model: USERS_1.default, as: "assigneed", attributes: { exclude: ['password'] } },
                ],
                order: [["createDate", "DESC"]]
            });
            return data;
        });
    }
    static _delete(rowid) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this._read(rowid);
            yield item.destroy();
            return item;
        });
    }
}
exports.ToDoService = ToDoService;
//# sourceMappingURL=ToDo.js.map