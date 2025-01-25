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
exports.BaseController = void 0;
const express = __importStar(require("express"));
const Base_1 = require("../services/Base");
const findServiceName_1 = require("../utils/findServiceName");
const HttpErrorResponse_1 = require("../errorHandler/HttpErrorResponse");
const router = express.Router();
exports.BaseController = router;
/**
* @swaggerPath
*
* /TABLENAME/create:
*   post:
*     tags:
*       - BaseService
*     security:
*       - Bearer: []
*     summary: Erstellt einen Eintrag in der angegebene Tabelle (MSSQL)
*     description: Als requestBody sollen mintestens alle NOT NULL Attribute mitgegeben werden. Schaue bitte Tabellendefinition.
*     responses:
*       "200":
*         description: Ausgabe erfolgreich
*       "401":
*         description: Nicht authentifiziert
*/
router.post('/create', findServiceName_1.findServiceName, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req["decoded"];
        const data = req.body;
        data.createUser = user.mail;
        data.updateUser = user.mail;
        const result = yield Base_1.BaseService.create(data, req["SERVICE"]);
        return res.status(200).json(result);
    }
    catch (error) {
        return new HttpErrorResponse_1.HttpErrorResponse(error, res);
    }
}));
/**
* @swaggerPath
*
* /TABLENAME/read/{rowid}:
*  get:
*    tags:
*      - BaseService
*    security:
*      - Bearer: []
*    summary: Liest einen Datensatz
*    description: Dieser Webservice liefert einen einzigen Datensatz. Falls Datensatz nicht vorhanden, wird ein Fehler ausgegeben
*    parameters:
*      -  name: rowid
*         description: rowid ist immer der PK von TABLENAME
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
router.get('/read/:rowid', findServiceName_1.findServiceName, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rowid = req.params.rowid;
        const result = yield Base_1.BaseService.read(rowid, req["SERVICE"]);
        return res.status(200).json(result);
    }
    catch (error) {
        return new HttpErrorResponse_1.HttpErrorResponse(error, res);
    }
}));
/**
* @swaggerPath
*
* /TABLENAME/find:
*  post:
*    tags:
*      - BaseService
*    security:
*      - Bearer: []
*    summary: Filtert Datensätze von der angegebene TABLENAME
*    description: Der FIND ist etwas anders als READ. Hier wird immer ein ARRAY zurückgegeben, auch ohne treffer.
*    requestBody:
*      content:
*        application/json:
*          schema:
*            type: object
*            example: { "SPALTENAME": "Testwert" }
*    responses:
*      "200":
*        description: Ausgabe erfolgreich
*      "401":
*        description: Nicht authentifiziert
*/
router.post('/find', findServiceName_1.findServiceName, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.body;
        const result = yield Base_1.BaseService.find(filter, req["SERVICE"]);
        return res.status(200).json(result);
    }
    catch (error) {
        return new HttpErrorResponse_1.HttpErrorResponse(error, res);
    }
}));
/**
* @swaggerPath
*
* /TABLENAME/update/{rowid}:
*  put:
*    tags:
*      - BaseService
*    security:
*      - Bearer: []
*    summary: Bearbeitet einen Datensatz
*    parameters:
*      - name: rowid
*        description: rowid ist immer der PK von TABLENAME
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
*             example: { "SPALTENAME": "Testwert2" }
*    responses:
*      "200":
*        description: Ausgabe erfolgreich
*      "401":
*        description: Nicht authentifiziert
*/
router.put('/update/:rowid', findServiceName_1.findServiceName, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req["decoded"];
        const data = req.body;
        const rowid = req.params.rowid;
        data.updateUser = user.mail;
        const result = yield Base_1.BaseService.update(data, { rowid }, req["SERVICE"]);
        return res.status(200).json(result);
    }
    catch (error) {
        return new HttpErrorResponse_1.HttpErrorResponse(error, res);
    }
}));
/**
* @swaggerPath
*
* /TABLENAME/delete:
*   delete:
*     tags:
*       - BaseService
*     security:
*       - Bearer: []
*     summary: Löscht einen Datensatz
*     parameters:
*       - name: rowid
*         description: rowid ist immer der PK von TABLENAME
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
router.delete('/delete/:rowid', findServiceName_1.findServiceName, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rowid = req.params.rowid;
        const result = yield Base_1.BaseService.delete({ rowid }, req["SERVICE"]);
        return res.status(200).json(result);
    }
    catch (error) {
        return new HttpErrorResponse_1.HttpErrorResponse(error, res);
    }
}));
//# sourceMappingURL=Base.js.map