
import { NotFoundError } from "../errorHandler/NotFoundError";
import ToDoSchema, { ToDo } from "../schema/DB/TODO";
import UserSchema from "../schema/DB/USERS";

class ToDoService extends ToDoSchema {

    static async _create(data: ToDo): Promise<ToDoSchema> {
        const result: ToDoSchema = await ToDoSchema.create(data);
        return this._read(result.dataValues.rowid);
    }

    static async _read(rowid: string): Promise<ToDoSchema> {
        const filter = { rowid: rowid };
        const item: ToDoSchema = await ToDoSchema.findOne({
            where: filter,
            include: [
                { model: UserSchema, as: "creator", attributes: { exclude: ['password'] } },
                { model: UserSchema, as: "updater", attributes: { exclude: ['password'] } },
                { model: UserSchema, as: "assigneed", attributes: { exclude: ['password'] } },
            ]
        });

        if (!item) throw new NotFoundError("Item not found: " + rowid);
        return item;
    }

    static async _update(data: ToDo, rowid: string): Promise<ToDoSchema> {
        const item: ToDoSchema = await this._read(rowid);
        const result: ToDoSchema = await item.update(data);
        return this._read(result.dataValues.rowid);
    }

    static async _find(filter): Promise<ToDoSchema[]> {
        const data: ToDoSchema[] = await ToDoSchema.findAll({
            where: { ...filter },
            include: [
                { model: UserSchema, as: "creator", attributes: { exclude: ['password'] } },
                { model: UserSchema, as: "updater", attributes: { exclude: ['password'] } },
                { model: UserSchema, as: "assigneed", attributes: { exclude: ['password'] } },
            ],
            order: [["createDate", "DESC"]]
        });

        return data;
    }

    static async _delete(rowid: string): Promise<ToDoSchema> {
        const item: ToDoSchema = await this._read(rowid);
        await item.destroy();
        return item;
    }


}

export { ToDoService as ToDoService };