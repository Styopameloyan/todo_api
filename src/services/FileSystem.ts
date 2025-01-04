import * as fs from "fs";
import * as path from "path";
import config from "config";
import FileSchema, { File } from "../schema/DB/FILE";
import { v4 as uuidv4 } from 'uuid';
import { DocumentsService } from "./Documents";

export class FileSystem {
    static filesFolder: string = path.resolve(config.get("attachmentFolder"));

    static async create(data: any, file: any): Promise<File> {
        if (!data.rowid) data.rowid = uuidv4();

        const directory: string = path.join(this.filesFolder, "files", data.className, uuidv4());
        const existDirectory: boolean = await this.exists(directory);
        if (!existDirectory) await this.mkdir(directory);

        const filePath = path.join(directory, file.originalname)
        await this.rename(file.path, filePath);

        const result: File = await FileSchema.create({
            reference: data.rowid,
            className: data.className,
            size: Number(file.size),
            name: file.originalname,
            path: filePath.substring(filePath.indexOf("files"), filePath.length),
            type: file.mimetype || filePath.substring(filePath.lastIndexOf(".") + 1),
            department: data.department,
            public: Number(data.public),
            title: data.title,
            description: data.description,
            company: data.company,

            createUser: data.createUser || "",
            updateUser: data.updateUser || "",
        }) as File;

        return Promise.resolve(result);
    }

    static async remove(data: File): Promise<void> {
        const item = await DocumentsService.read(data.rowid) as FileSchema;
        await item.destroy();

        const filePath: string = path.join(this.filesFolder, data.path);
        return this.delete(filePath);
    }

    static async delete(filePath: string): Promise<void> {
        const exist: boolean = await this.exists(filePath);
        if (!exist) return Promise.reject("File not exist" + filePath);

        return new Promise(async (resolve) => {
            return fs.unlink(filePath, async (err) => {
                if (err) throw new Error(err.message);

                const directory: string = path.dirname(filePath);
                await this.removeDirectory(directory);// Das UUID Ordner löschen!

                let parentDirectory: string = path.resolve(directory, '..');
                while (await this.isEmpty(parentDirectory) && path.basename(parentDirectory) != "files") {
                    await this.removeDirectory(parentDirectory);
                    parentDirectory = path.resolve(parentDirectory, '..');
                }

                return resolve();
            });
        });
    }

    static async isEmpty(directory: string): Promise<boolean> {
        return new Promise((resolve) => {
            return fs.readdir(directory, (err, files: string[]) => {
                if (err) throw new Error(err.message);
                return resolve(files.length === 0);
            });
        });
    }

    static async removeDirectory(directory: string): Promise<void> {
        return new Promise((resolve, reject) => {
            return fs.rmdir(directory, { recursive: true }, (err) => {
                if (err) return reject(err.message);
                return resolve();
            });
        });
    }

    static async exists(directory: string): Promise<boolean> {
        return new Promise((resolve) => {
            return fs.stat(directory, (err) => {
                if (err) return resolve(false);
                return resolve(true);
            });
        });
    }

    static async mkdir(directory: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            return fs.mkdir(directory, { recursive: true }, (err) => {
                if (err) return reject(err.message);
                return resolve(true);
            });
        });
    }

    static async rename(oldPath: string, newPath: string): Promise<boolean> {
        return new Promise((resolve) => {
            return fs.rename(oldPath, newPath, (err) => {
                if (err) throw new Error(err.message);
                return resolve(true);
            });
        });
    }


} 