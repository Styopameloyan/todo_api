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
exports.afterBulkDestroy = void 0;
const winston_1 = __importDefault(require("winston"));
const READFLAG_1 = __importDefault(require("../../DB/READFLAG"));
const COMMENT_1 = __importDefault(require("../../DB/COMMENT"));
const FILE_1 = __importDefault(require("../../DB/FILE"));
const Documents_1 = require("../../../services/Documents");
/**
 * Dieser Hook wird nach dem Löschen einer oder mehrere Instanzen in allen Tabellen ausgeführt.
 * Er entfernt auch zugehörige Datensätze, die in Beziehung zur gelöschten Instanz/en stehen.
 *
 * @param {Model} options - Die SequelizeDestroy-Options .
 * @returns {Promise<void>} Ein Promise void.
 *
 * @example
 * // Beispiel für die Verwendung:
 * // Die Funktion wird automatisch aufgerufen, wenn eine oder mehrere Instanzen gelöscht wird.
 *  MeinModelSchema.destroy({ where: { ... } });
 */
const afterBulkDestroy = (options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rowid = options.where.rowid;
        yield READFLAG_1.default.destroy({ where: { reference: rowid } });
        yield COMMENT_1.default.destroy({ where: { reference: rowid } });
        const files = yield FILE_1.default.findAll({ where: { reference: rowid } }).catch(() => []);
        const fileRowids = files.map((item) => item.rowid);
        yield Documents_1.DocumentsService.delete(fileRowids);
        return;
    }
    catch (error) {
        winston_1.default.error(error.message || error);
        return;
    }
});
exports.afterBulkDestroy = afterBulkDestroy;
//# sourceMappingURL=afterBulkDestroy.js.map