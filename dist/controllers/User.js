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
exports.UserController = void 0;
const express = __importStar(require("express"));
const joiValidator_1 = __importDefault(require("../middleware/joiValidator"));
const User_1 = require("../services/User");
const user_1 = require("../schema/validator/user/user");
const HttpErrorResponse_1 = require("../errorHandler/HttpErrorResponse");
const bcrypt = __importStar(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express.Router();
exports.UserController = router;
/**
* @swaggerPath
*
* /contacts/create:
*   post:
*     tags:
*       - Contacts
*     security:
*       - Bearer: []
*     summary: Erstellt einen Eintrag in der Tabelle Contacts.
*     description: mail oder userPrincipialName sollte mitgegeben werden.
*     requestBody:
*       content:
*        application/json:
*          schema:
*            type: object
*            example: {"mail": "test@bauformat.de"}
*     responses:
*       "200":
*         description: Ausgabe erfolgreich
*       "401":
*         description: Nicht authentifiziert
*/
router.post('/register', (0, joiValidator_1.default)(user_1.CreateSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield User_1.UserService._create(data);
        return res.status(200).json(result);
    }
    catch (error) {
        return new HttpErrorResponse_1.HttpErrorResponse(error, res);
    }
}));
/**
* @swaggerPath
*
* /contacts/read/{mail}:
*  get:
*    tags:
*      - Contacts
*    security:
*      - Bearer: []
*    summary: Liest einen Datensatz
*    description: Dieser Webservice liefert einen einzigen Datensatz. Falls Datensatz nicht vorhanden, wird ein Fehler ausgegeben
*    parameters:
*      -  name: mail
*         description: mail ist eindeutig
*         in: path
*         required: true
*         example: test@bauformat.de
*         schema:
*          type: string
*    responses:
*      "200":
*        description: Ausgabe erfolgreich
*      "401":
*        description: Nicht authentifiziert
*/
router.get('/read/:mail', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mail = req.params.mail;
        const result = yield User_1.UserService.read(mail);
        return res.status(200).json(result);
    }
    catch (error) {
        return new HttpErrorResponse_1.HttpErrorResponse(error, res);
        ;
    }
}));
/**
* @swaggerPath
*
* /contacts/update/{mail}:
*  put:
*    tags:
*      - Contacts
*    security:
*      - Bearer: []
*    summary: Bearbeitet einen Datensatz
*    parameters:
*      - name: mail
*        description: mail ist eindeutig
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
*             example: { "description": "Testwert2" }
*    responses:
*      "200":
*        description: Ausgabe erfolgreich
*      "401":
*        description: Nicht authentifiziert
*/
router.put('/update/:mail', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req["decoded"];
        const data = req.body;
        const mail = req.params.mail;
        data.updateUser = user.mail;
        const result = yield User_1.UserService._update(data, mail);
        return res.status(200).json(result);
    }
    catch (error) {
        return new HttpErrorResponse_1.HttpErrorResponse(error, res);
    }
}));
/**
* @swaggerPath
*
* /contacts/find:
*  post:
*    tags:
*      - Contacts
*    security:
*      - Bearer: []
*    summary: Filtert Datensätze von Contacts
*    description: Der FIND ist etwas anders als READ. Hier wird immer ein ARRAY zurückgegeben, auch ohne treffer. Alle Kontakt Einträge haben zusätzlich die GRUPPEN als Relation.
*    requestBody:
*      content:
*        application/json:
*          schema:
*            type: object
*            example: { "cn": "Testwert" }
*    responses:
*      "200":
*        description: Ausgabe erfolgreich
*      "401":
*        description: Nicht authentifiziert
*/
router.post('/find', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.body;
        const result = yield User_1.UserService.find(Object.assign({}, filter));
        return res.status(200).json(result);
    }
    catch (error) {
        return new HttpErrorResponse_1.HttpErrorResponse(error, res);
        ;
    }
}));
/**
* @swaggerPath
*
* /contacts/delete:
*   delete:
*     tags:
*       - Contacts
*     security:
*       - Bearer: []
*     summary: Löscht einen Datensatz von Contacts
*     parameters:
*       - name: mail
*         description: mail ist eindeutig
*         in: query
*         schema:
*           type: string
*           example: ?mail=test@bauformat.de
*     responses:
*       "200":
*         description: Ausgabe erfolgreich
*       "401":
*         description: Nicht authentifiziert
*/
router.delete('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mail = req.query.mail;
        const result = yield User_1.UserService.delete(mail);
        return res.status(200).json(result);
    }
    catch (error) {
        return new HttpErrorResponse_1.HttpErrorResponse(error, res);
        ;
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mail = req.body.mail;
        const password = req.body.password;
        // Überprüfe, ob der Benutzer existiert
        const user = yield User_1.UserService.read(mail);
        // Vergleiche das Passwort mit dem gespeicherten Hash
        const isPasswordValid = yield bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Ungültige E-Mail oder Passwort' });
        }
        // Generiere ein JWT-Token
        const token = jsonwebtoken_1.default.sign({ mail: user.mail }, "-mortqunem-", { expiresIn: '1h' });
        // Gebe das Token als Teil der Antwort zurück
        return res.status(200).json(Object.assign(Object.assign({}, user.dataValues), { token }));
    }
    catch (error) {
        return new HttpErrorResponse_1.HttpErrorResponse(error, res);
    }
}));
//# sourceMappingURL=User.js.map