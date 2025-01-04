import { NotFoundError } from "../errorHandler/NotFoundError";

class BaseService {

    static async create(data, MODEL) {
        return MODEL.create(data)
            .then((item) => item.reload())
    }

    static read(rowid, MODEL) {
        let filter = { rowid: rowid };
        return MODEL.findOne({ where: filter })
            .then((item) => {
                if (!item) {
                    throw new NotFoundError("item dont exist: " + JSON.stringify(filter || ""));
                }
                return item;
            });
    }

    static find(filter, MODEL) {
        return MODEL.findAll({
            where: filter,
            order: [["createDate", "DESC"]]
        });
    }

    static async update(data, filter, MODEL): Promise<Object> {
        const item = await MODEL.findOne({ where: filter });
        if (!item) throw new NotFoundError("item dont exist: " + JSON.stringify(filter || ""));
        return item.update(data);
    }

    static async delete(filter, MODEL): Promise<any> {
        const item = await MODEL.findOne({ where: filter });
        if (!item) throw new NotFoundError("item dont exist: " + JSON.stringify(filter || ""));
        return await item.destroy();
    }

}

export { BaseService };