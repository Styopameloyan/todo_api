"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystem = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const config_1 = __importDefault(require("config"));
const FILE_1 = __importDefault(require("../schema/DB/FILE"));
const uuid_1 = require("uuid");
const Documents_1 = require("./Documents");
class FileSystem {
    static create(data, file) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.rowid)
                data.rowid = (0, uuid_1.v4)();
            const directory = path.join(this.filesFolder, "files", data.className, (0, uuid_1.v4)());
            const existDirectory = yield this.exists(directory);
            if (!existDirectory)
                yield this.mkdir(directory);
            const filePath = path.join(directory, file.originalname);
            yield this.rename(file.path, filePath);
            const result = yield FILE_1.default.create({
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
            });
            return Promise.resolve(result);
        });
    }
    static remove(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield Documents_1.DocumentsService.read(data.rowid);
            yield item.destroy();
            const filePath = path.join(this.filesFolder, data.path);
            return this.delete(filePath);
        });
    }
    static delete(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield this.exists(filePath);
            if (!exist)
                return Promise.reject("File not exist" + filePath);
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                return fs.unlink(filePath, (err) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw new Error(err.message);
                    const directory = path.dirname(filePath);
                    yield this.removeDirectory(directory); // Das UUID Ordner löschen!
                    let parentDirectory = path.resolve(directory, '..');
                    while ((yield this.isEmpty(parentDirectory)) && path.basename(parentDirectory) != "files") {
                        yield this.removeDirectory(parentDirectory);
                        parentDirectory = path.resolve(parentDirectory, '..');
                    }
                    return resolve();
                }));
            }));
        });
    }
    static isEmpty(directory) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                return fs.readdir(directory, (err, files) => {
                    if (err)
                        throw new Error(err.message);
                    return resolve(files.length === 0);
                });
            });
        });
    }
    static removeDirectory(directory) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                return fs.rmdir(directory, { recursive: true }, (err) => {
                    if (err)
                        return reject(err.message);
                    return resolve();
                });
            });
        });
    }
    static exists(directory) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                return fs.stat(directory, (err) => {
                    if (err)
                        return resolve(false);
                    return resolve(true);
                });
            });
        });
    }
    static mkdir(directory) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                return fs.mkdir(directory, { recursive: true }, (err) => {
                    if (err)
                        return reject(err.message);
                    return resolve(true);
                });
            });
        });
    }
    static rename(oldPath, newPath) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                return fs.rename(oldPath, newPath, (err) => {
                    if (err)
                        throw new Error(err.message);
                    return resolve(true);
                });
            });
        });
    }
}
exports.FileSystem = FileSystem;
FileSystem.filesFolder = path.resolve(config_1.default.get("attachmentFolder"));
//# sourceMappingURL=FileSystem.js.map