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
exports.DocumentsService = void 0;
const NotFoundError_1 = require("../errorHandler/NotFoundError");
const FILE_1 = require("../schema/DB/FILE");
const FileSystem_1 = require("./FileSystem");
class DocumentsService extends FILE_1.FileSchema {
    static _create(files, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = [];
            for (const file of files) {
                const item = yield FileSystem_1.FileSystem.create(data, file);
                result.push(item);
            }
            return result;
        });
    }
    static read(rowid) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { rowid: rowid };
            const item = yield FILE_1.FileSchema.findOne({ where: filter });
            if (!item)
                throw new NotFoundError_1.NotFoundError("Item not found: " + rowid);
            return item;
        });
    }
    static _update(data, rowid) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.read(rowid);
            return item.update(data);
        });
    }
    static find(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield FILE_1.FileSchema.findAll({
                where: Object.assign({}, filter),
                order: [['createDate', 'DESC']]
            });
            return data;
        });
    }
    static delete(rowids) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(rowids))
                rowids = [rowids];
            for (const rowid of rowids) {
                const item = yield this.read(rowid);
                yield FileSystem_1.FileSystem.remove(item);
            }
            return `successfully deleted`;
        });
    }
}
exports.DocumentsService = DocumentsService;
//# sourceMappingURL=Documents.js.map