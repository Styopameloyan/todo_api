import winston from "winston";
import ReadFlagSchema from "../../DB/READFLAG";
import CommentSchema from "../../DB/COMMENT";
import { DocumentsService } from "../../../services/Documents";
import FileSchema from "../../DB/FILE";
import { InstanceDestroyOptions } from "sequelize";

/**
 * Dieser Hook wird nach dem Löschen einer Instanz in allen Tabellen ausgeführt.
 * Er entfernt auch zugehörige Datensätze, die in Beziehung zur gelöschten Instanz stehen.
 *
 * @param {Model} instance - Die Sequelize-Instanz, die gelöscht wurde.
 * @returns {Promise<void>} Ein Promise void. 
 *
 * @example
 * // Beispiel für die Verwendung:
 * // Die Funktion wird automatisch aufgerufen, wenn eine Instanz gelöscht wird.
 * await MeinModelSchema.destroy();
 */
export const afterDestroy = async (instance: any, options: InstanceDestroyOptions): Promise<void> => {
    try {
        const rowid: string = instance.rowid;

        await ReadFlagSchema.destroy({ where: { reference: rowid } });
        await CommentSchema.destroy({ where: { reference: rowid } });

        const files = await FileSchema.findAll({ where: { reference: rowid } }).catch(() => []);
        const fileRowids = files.map((item) => item.rowid);
        await DocumentsService.delete(fileRowids);

        return;
    }
    catch (error) { winston.error(error.message || error); return; }
};

