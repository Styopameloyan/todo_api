import winston from "winston";
import ReadFlagSchema from "../../DB/READFLAG";
import CommentSchema from "../../DB/COMMENT";
import FileSchema from "../../DB/FILE";
import { DocumentsService } from "../../../services/Documents";

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
export const afterBulkDestroy = async (options): Promise<void> => {
    try {
        const rowid = options.where.rowid;

        await ReadFlagSchema.destroy({ where: { reference: rowid } });
        await CommentSchema.destroy({ where: { reference: rowid } });

        const files = await FileSchema.findAll({ where: { reference: rowid } }).catch(() => []);
        const fileRowids = files.map((item) => item.rowid);
        await DocumentsService.delete(fileRowids);

        return;
    }
    catch (error) { winston.error(error.message || error); return; }
};

