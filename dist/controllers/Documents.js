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
exports.DocumentController = void 0;
const express = __importStar(require("express"));
const Documents_1 = require("../services/Documents");
const HttpErrorResponse_1 = require("../errorHandler/HttpErrorResponse");
const file_1 = require("../schema/validator/file/file");
const joiValidator_1 = __importDefault(require("../middleware/joiValidator"));
const config_1 = __importDefault(require("config"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = express.Router();
exports.DocumentController = router;
const upload = (0, multer_1.default)({ dest: path_1.default.resolve(config_1.default.get("attachmentFolder"), "temp") });
/**
* @swaggerPath
*
 * /file/create:
 *   post:
 *     tags:
 *       - Documents
 *     security:
 *       - Bearer: []
 *     summary: Erstellt eine Datei.
 *     description: Diese Route ermöglicht das Hochladen von Dateien.
 *                  Es können bis zu 50 Dateien gleichzeitig hochgeladen werden.
 *                  Es werden verschiedene Dateitypen akzeptiert, darunter Bilder, Audio- und Videodateien, PDFs, Textdokumente und mehr.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               reference:
 *                 type: string
 *               className:
 *                 type: string
 *               department:
 *                 type: string
 *               public:
 *                 type: string
 *                 enum: ["0", "1"]
 *     responses:
 *       "200":
 *         description: Ausgabe erfolgreich
 *       "401":
 *         description: Nicht authentifiziert
 */
router.post('/create', upload.array('files'), (0, joiValidator_1.default)(file_1.CreateSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req.files;
        const user = req["decoded"];
        const data = req.body;
        data.createUser = user.mail;
        data.updateUser = user.mail;
        for (const file of files) {
            file.originalname = Buffer.from(file.originalname, "latin1").toString('utf8');
        }
        const result = yield Documents_1.DocumentsService._create(files, data);
        return res.status(200).json(result);
    }
    catch (error) {
        return new HttpErrorResponse_1.HttpErrorResponse(error, res);
    }
}));
/**
* @swaggerPath
*
 * /file/read/{rowid}:
 *   get:
 *     tags:
 *       - Documents
 *     security:
 *       - Bearer: []
 *     summary: Liest eine Datei.
 *     description: Diese Route ermöglicht das Lesen einer Datei anhand ihrer ROWID.
 *     parameters:
 *       - name: rowid
 *         in: path
 *         description: Die rowid der Datei.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Ausgabe erfolgreich
 *       "401":
 *         description: Nicht authentifiziert
 */
router.get('/read/:rowid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rowid = req.params.rowid;
        const result = yield Documents_1.DocumentsService.read(rowid);
        return res.status(200).json(result);
    }
    catch (error) {
        return new HttpErrorResponse_1.HttpErrorResponse(error, res);
    }
}));
/**
 * @swaggerPath
 * /file/update/{rowid}:
 *   put:
 *     tags:
 *       - Documents
 *     security:
 *       - Bearer: []
 *     summary: Aktualisiert eine Datei (NUR DEN EINTRAG IN DER DB!).
 *     description: Diese Route ermöglicht das Aktualisieren einer Datei anhand ihrer ROWID.
 *     parameters:
 *       - name: rowid
 *         in: path
 *         description: Die ID der Datei.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               updateUser: example@example.com
 *     responses:
 *       "200":
 *         description: Ausgabe erfolgreich
 *       "401":
 *         description: Nicht authentifiziert
 */
router.put('/update/:rowid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req["decoded"];
        const data = req.body;
        const rowid = req.params.rowid;
        data.updateUser = user.mail;
        const result = yield Documents_1.DocumentsService._update(data, rowid);
        return res.status(200).json(result);
    }
    catch (error) {
        return new HttpErrorResponse_1.HttpErrorResponse(error, res);
    }
}));
/**
 * @swaggerPath
 * /file/find:
 *   post:
 *     tags:
 *       - Documents
 *     security:
 *       - Bearer: []
 *     summary: Sucht nach Dateien.
 *     description: Diese Route ermöglicht die Suche nach Dateien anhand von Filterkriterien.
 *                  Wenn body leer, dann wird alles zurückgegeben.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               department: IT
 *     responses:
 *       "200":
 *         description: Ausgabe erfolgreich
 *       "401":
 *         description: Nicht authentifiziert
 */
router.post('/find', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.body;
        const result = yield Documents_1.DocumentsService.find(Object.assign({}, filter));
        return res.status(200).json(result);
    }
    catch (error) {
        return new HttpErrorResponse_1.HttpErrorResponse(error, res);
    }
}));
/**
 * @swaggerPath
 * /file/delete:
 *   delete:
 *     tags:
 *       - Documents
 *     security:
 *       - Bearer: []
 *     summary: Löscht eine Datei.
 *     description: Diese Route ermöglicht das Löschen einer oder mehrerer Dateien anhand ihrer ROWIDs.
 *     parameters:
 *       - name: rowid
 *         in: query
 *         description: Die ROWID(s) der zu löschenden Datei(en).
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *     responses:
 *       "200":
 *         description: Ausgabe erfolgreich
 *       "401":
 *         description: Nicht authentifiziert
 */
router.delete('/delete', (0, joiValidator_1.default)(file_1.DeleteSchema, null, "query"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rowid = req.query.rowid;
        const result = yield Documents_1.DocumentsService.delete(rowid);
        return res.status(200).json(result);
    }
    catch (error) {
        return new HttpErrorResponse_1.HttpErrorResponse(error, res);
    }
}));
//# sourceMappingURL=Documents.js.map