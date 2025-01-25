"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.beforeUpdate = void 0;
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale("de");
/**
 * Eine Funktion, die vor der Aktualisierung eines Eintrags aufgerufen wird.
 * Aktualisiert das updateDate-Feld um 2 Stunden für IBM DB2.
 * Muss angepasst werden, wenn auf eine andere Datenbank umgestellt wird.
 *
 * @param {Object} instance - Das Modellinstanzobjekt.
 */
const _beforeUpdate = (instance) => {
    // Aktuelles Datum mit 2 Stunden Verschiebung
    const currentDate = (0, moment_1.default)().add(2, 'hours').toDate();
    instance.updateDate = currentDate;
};
const beforeUpdate = (instance) => {
    instance.updateDate = new Date();
};
exports.beforeUpdate = beforeUpdate;
//# sourceMappingURL=beforeUpdate.js.map