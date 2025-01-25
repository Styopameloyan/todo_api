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
exports.CommentService = void 0;
const NotFoundError_1 = require("../errorHandler/NotFoundError");
const COMMENT_1 = __importDefault(require("../schema/DB/COMMENT"));
const USERS_1 = __importDefault(require("../schema/DB/USERS"));
class CommentService extends COMMENT_1.default {
    static _create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield COMMENT_1.default.create(data);
            return result;
        });
    }
    static read(rowid) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { rowid: rowid };
            const item = yield COMMENT_1.default.findOne({
                where: filter,
                include: [
                    { model: USERS_1.default, as: "creator" }
                ]
            });
            if (!item)
                throw new NotFoundError_1.NotFoundError("Item not found: " + rowid);
            return item;
        });
    }
    static _update(data, rowid) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.read(rowid);
            const result = yield item.update(data);
            return result;
        });
    }
    static find(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield COMMENT_1.default.findAll({
                where: Object.assign({}, filter),
                include: [
                    { model: USERS_1.default, as: "creator", }
                ],
                order: [["createDate", "DESC"]]
            });
            return data;
        });
    }
    static delete(rowid) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.read(rowid);
            yield item.destroy();
            return `successfully deleted: ${rowid}`;
        });
    }
}
exports.CommentService = CommentService;
//# sourceMappingURL=Comment.js.map