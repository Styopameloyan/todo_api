
import { NotFoundError } from "../errorHandler/NotFoundError";
import { FileSchema } from "../schema/DB/FILE";
import DynamicDataSchema, { DynamicData } from "../schema/DB/DYNAMICDATA";

class DynamicDataService extends DynamicDataSchema {

    static async _create(data: DynamicData): Promise<DynamicDataSchema> {
        const result: DynamicDataSchema = await DynamicDataSchema.create(data);
        return result;
    }

    static async read(rowid: string): Promise<DynamicDataSchema> {
        const item: DynamicDataSchema = await DynamicDataSchema.findOne({
            where: { rowid: rowid },
            include: [{ model: FileSchema, as: "files" }]
        });

        if (!item) throw new NotFoundError("Item not found: " + rowid);
        return item;
    }

    static async _update(data: DynamicData, rowid: string): Promise<DynamicDataSchema> {
        const item: DynamicDataSchema = await this.read(rowid);
        const result: DynamicDataSchema = await item.update(data);
        return result;
    }

    static async find(filter: DynamicData): Promise<DynamicDataSchema[]> {
        const data: DynamicDataSchema[] = await DynamicDataSchema.findAll({
            where: { ...filter },
            include: [{ model: FileSchema, as: "files" }],
            order: [
                ["createDate", "DESC"],
                [{ model: FileSchema, as: 'files' }, 'type', 'DESC']
            ]
        });

        return data;
    }

    static async delete(rowid: string): Promise<string> {
        const item: DynamicDataSchema = await this.read(rowid);
        await item.destroy();
        return `successfully deleted: ${rowid}`;
    }
}

export { DynamicDataService };