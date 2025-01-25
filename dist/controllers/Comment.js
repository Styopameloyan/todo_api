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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const express = __importStar(require("express"));
const HttpErrorResponse_1 = require("../errorHandler/HttpErrorResponse");
const Comment_1 = require("../services/Comment");
const router = express.Router();
exports.CommentController = router;
/**
* @swaggerPath
*
* /comment/create:
*   post:
*     tags:
*       - Comment
*     security:
*       - Bearer: []
*     summary: Erstellt einen Eintrag in der Tabelle Comment.
*     description: Felder die Pflicht sind title, company, start, end und department.
*     requestBody:
*       content:
*        application/json:
*          schema:
*            type: object
*            example: {"titel": "Hallo das ist ein Tietel","description": "das ist ein Test Beschreibung"}
*     responses:
*       "200":
*         description: Ausgabe erfolgreich
*       "401":
*         description: Nicht authentifiziert
*/
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req["decoded"];
        const data = req.body;
        data.createUser = user.mail;
        data.updateUser = user.mail;
        const result = yield Comment_1.CommentService._create(data);
        return res.status(200).json(result.dataValues);
    }
    catch (error) {
        return new HttpErrorResponse_1.HttpErrorResponse(error, res);
    }
}));
/**
* @swaggerPath
*
* /comment/read/{rowid}:
*  get:
*    tags:
*      - Comment
*    security:
*      - Bearer: []
*    summary: Liest einen Datensatz
*    description: Dieser Webservice liefert einen einzigen Datensatz. Falls Datensatz nicht vorhanden, wird ein Fehler ausgegeben
*    parameters:
*      -  name: rowid
*         description: rowid ist der PK von COMMENT
*         in: path
*         required: true
*         example: B982433E-F36B-1410-861F-00301E2AFC56
*         schema:
*          type: string
*    responses:
*      "200":
*        description: Ausgabe erfolgreich
*      "401":
*        description: Nicht authentifiziert
*/
router.get('/read/:rowid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rowid = req.params.rowid;
        const result = yield Comment_1.CommentService.read(rowid);
        return res.status(200).json(result.dataValues);
    }
    catch (error) {
        return new HttpErrorResponse_1.HttpErrorResponse(error, res);
    }
}));
/**
* @swaggerPath
*
* /comment/update/{rowid}:
*  put:
*    tags:
*      - Comment
*    security:
*      - Bearer: []
*    summary: Bearbeitet einen Datensatz
*    parameters:
*      - name: rowid
*        description: rowid ist der PK von COMMENT
*        in: path
*        required: true
*        example: B982433E-F36B-1410-861F-00301E2AFC56
*        schema:
*          type: string
*    requestBody:
*      content:
*        application/json:
*          schema:
*             type: object
*             example: { "value": "Testwert2" }
*    responses:
*      "200":
*        description: Ausgabe erfolgreich
*      "401":
*        description: Nicht authentifiziert
*/
router.put('/update/:rowid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req["decoded"];
        const data = req.body;
        const rowid = req.params.rowid;
        data.updateUser = user.mail;
        const result = yield Comment_1.CommentService._update(data, rowid);
        return res.status(200).json(result.dataValues);
    }
    catch (error) {
        return new HttpErrorResponse_1.HttpErrorResponse(error, res);
    }
}));
/**
* @swaggerPath
*
* /comment/find:
*  post:
*    tags:
*      - Comment
*    security:
*      - Bearer: []
*    summary: Filtert Datensätze von Comment
*    description: Der FIND ist etwas anders als READ. Hier wird immer ein ARRAY zurückgegeben, auch ohne treffer.
*                 Alle COMMENT Einträge haben zusätzlich die Relation.
*    requestBody:
*      content:
*        application/json:
*          schema:
*            type: object
*            example: { "title": "Testwert" }
*    responses:
*      "200":
*        description: Ausgabe erfolgreich
*      "401":
*        description: Nicht authentifiziert
*/
router.post('/find', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.body;
        const result = yield Comment_1.CommentService.find(Object.assign({}, filter));
        return res.status(200).json(result);
    }
    catch (error) {
        return new HttpErrorResponse_1.HttpErrorResponse(error, res);
    }
}));
/**
* @swaggerPath
*
* /comment/delete:
*   delete:
*     tags:
*       - Comment
*     security:
*       - Bearer: []
*     summary: Löscht einen Datensatz von Comment
*     parameters:
*       - name: rowid
*         description: rowid ist der PK von COMMENT
*         in: query
*         schema:
*           type: string
*           example: ?rowid=B982433E-F36B-1410-861F-00301E2AFC56
*     responses:
*       "200":
*         description: Ausgabe erfolgreich
*       "401":
*         description: Nicht authentifiziert
*/
router.delete('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rowid = req.query.rowid;
        const result = yield Comment_1.CommentService.delete(rowid);
        return res.status(200).json(result);
    }
    catch (error) {
        return new HttpErrorResponse_1.HttpErrorResponse(error, res);
    }
}));
//# sourceMappingURL=Comment.js.map