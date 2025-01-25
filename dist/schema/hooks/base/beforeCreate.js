"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.beforeCreate = void 0;
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale("de");
/**
 * Eine Funktion, die vor der Erstellung eines Eintrags aufgerufen wird.
 * Aktualisiert das createDate- und updateDate-Feld um 2 Stunden für IBM DB2.
 * Muss angepasst werden, wenn auf eine andere Datenbank umgestellt wird.
 *
 * @param {Object} instance - Das Modellinstanzobjekt.
 * @param {Object} options - Optionsobjekt für die Operation.
 */
const _beforeCreate = (instance, options) => {
    // Aktuelles Datum mit 2 Stunden Verschiebung
    const currentDate = (0, moment_1.default)().add(2, 'hours').toDate();
    instance.createDate = currentDate;
    instance.updateDate = currentDate;
};
const beforeCreate = (instance, options) => {
    instance.createDate = new Date();
    instance.updateDate = new Date();
};
exports.beforeCreate = beforeCreate;
//# sourceMappingURL=beforeCreate.js.map