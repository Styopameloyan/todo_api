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
exports.UserService = void 0;
const USERS_1 = __importDefault(require("../schema/DB/USERS"));
const NotFoundError_1 = require("../errorHandler/NotFoundError");
class UserService extends USERS_1.default {
    static _create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield USERS_1.default.create(data);
            return result;
        });
    }
    static read(mail) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield USERS_1.default.findOne({
                where: { mail },
            });
            if (!item)
                throw new NotFoundError_1.NotFoundError("Item not found: " + mail);
            return item;
        });
    }
    static _update(data, mail) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.read(mail);
            return item.update(data);
        });
    }
    static find(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield USERS_1.default.findAll({
                attributes: { exclude: ['password'] },
                where: filter,
                order: [["displayName", "ASC"]],
            });
            return data;
        });
    }
    static delete(mail) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { mail: mail };
            const ok = yield USERS_1.default.destroy({ where: filter });
            if (!ok)
                throw new NotFoundError_1.NotFoundError("Item not found: " + mail);
            return `successfully deleted: ${mail}`;
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=User.js.map