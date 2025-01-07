

import UserSchema, { User } from "../schema/DB/USERS";
import { NotFoundError } from "../errorHandler/NotFoundError";

class UserService extends UserSchema {

    static async _create(data: User): Promise<User> {
        const result: User = await UserSchema.create(data) as User;
        return result
    }

    static async read(mail: string): Promise<User> {
        const item: User = await UserSchema.findOne({
            where: { mail },
        }) as User;

        if (!item) throw new NotFoundError("Item not found: " + mail);
        return item;
    }

    static async _update(data: User, mail: string): Promise<User> {
        const item = await this.read(mail) as UserSchema;
        return item.update(data) as User;
    }

    static async find(filter) {
        const data: User[] = await UserSchema.findAll({
            where: filter,
            order: [["displayName", "ASC"]],
        }) as User[];

        return data;
    }

    static async delete(mail: string | string[]): Promise<string> {
        const filter = { mail: mail };
        const ok: number = await UserSchema.destroy({ where: filter });
        if (!ok) throw new NotFoundError("Item not found: " + mail);
        return `successfully deleted: ${mail}`;
    }

}

export { UserService };