import { Op } from "sequelize";
import { NotFoundError } from "../errorHandler/NotFoundError";
import { File, FileSchema } from "../schema/DB/FILE";
import { FileSystem } from "./FileSystem";

class DocumentsService extends FileSchema {

    static async _create(files: Object[], data: Object): Promise<File[]> {
        const result: File[] = [];
        for (const file of files) {
            const item = await FileSystem.create(data, file);
            result.push(item);
        }
        return result;
    }

    static async read(rowid: string): Promise<File> {
        const filter = { rowid: rowid };
        const item: File = await FileSchema.findOne({ where: filter }) as File;

        if (!item) throw new NotFoundError("Item not found: " + rowid);
        return item;
    }

    static async _update(data: Object, rowid: string): Promise<Object> {
        const item = await this.read(rowid) as FileSchema;
        return item.update(data);
    }

    static async find(filter) {
        const data: File[] = await FileSchema.findAll({
            where: { ...filter },
            order: [['createDate', 'DESC']]
        }) as File[];
        return data;
    }

    static async delete(rowids: string | string[]): Promise<string> {
        if (!Array.isArray(rowids)) rowids = [rowids];

        for (const rowid of rowids) {
            const item = await this.read(rowid) as File;
            await FileSystem.remove(item);
        }

        return `successfully deleted`;
    }
}

export { DocumentsService };