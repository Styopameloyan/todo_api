
import { NotFoundError } from "../errorHandler/NotFoundError";
import CommentSchema, { Comment } from "../schema/DB/COMMENT";
import UserSchema from "../schema/DB/USERS";

class CommentService extends CommentSchema {

    static async _create(data: Comment): Promise<CommentSchema> {
        const result: CommentSchema = await CommentSchema.create(data);
        return result;
    }

    static async read(rowid: string): Promise<CommentSchema> {
        const filter = { rowid: rowid };
        const item: CommentSchema = await CommentSchema.findOne({
            where: filter,
            include: [
                { model: UserSchema, as: "creator" }
            ]
        });

        if (!item) throw new NotFoundError("Item not found: " + rowid);
        return item;
    }

    static async _update(data: Comment, rowid: string): Promise<CommentSchema> {
        const item: CommentSchema = await this.read(rowid);
        const result: CommentSchema = await item.update(data);
        return result;
    }

    static async find(filter): Promise<CommentSchema[]> {
        const data: CommentSchema[] = await CommentSchema.findAll({
            where: { ...filter },
            include: [
                { model: UserSchema, as: "creator", }
            ],
            order: [["createDate", "DESC"]]
        });

        return data;
    }

    static async delete(rowid: string): Promise<string> {
        const item: CommentSchema = await this.read(rowid);
        await item.destroy();

        return `successfully deleted: ${rowid}`;
    }


}

export { CommentService };