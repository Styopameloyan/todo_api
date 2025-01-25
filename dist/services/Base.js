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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const NotFoundError_1 = require("../errorHandler/NotFoundError");
class BaseService {
    static create(data, MODEL) {
        return __awaiter(this, void 0, void 0, function* () {
            return MODEL.create(data)
                .then((item) => item.reload());
        });
    }
    static read(rowid, MODEL) {
        let filter = { rowid: rowid };
        return MODEL.findOne({ where: filter })
            .then((item) => {
            if (!item) {
                throw new NotFoundError_1.NotFoundError("item dont exist: " + JSON.stringify(filter || ""));
            }
            return item;
        });
    }
    static find(filter, MODEL) {
        return MODEL.findAll({
            where: filter,
            order: [["createDate", "DESC"]]
        });
    }
    static update(data, filter, MODEL) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield MODEL.findOne({ where: filter });
            if (!item)
                throw new NotFoundError_1.NotFoundError("item dont exist: " + JSON.stringify(filter || ""));
            return item.update(data);
        });
    }
    static delete(filter, MODEL) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield MODEL.findOne({ where: filter });
            if (!item)
                throw new NotFoundError_1.NotFoundError("item dont exist: " + JSON.stringify(filter || ""));
            return yield item.destroy();
        });
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=Base.js.map