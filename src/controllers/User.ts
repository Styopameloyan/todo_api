import * as express from "express";
import joiValidator from "../middleware/joiValidator"
import { Request, Response } from 'express';
import { UserService } from "../services/User";
import { User } from "../schema/DB/USERS";
import { CreateSchema } from "../schema/validator/user/user";
import { HttpErrorResponse } from "../errorHandler/HttpErrorResponse";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

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
router.post('/register', joiValidator(CreateSchema), async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const result: User = await UserService._create(data);
        return res.status(200).json(result);
    } catch (error) {
        return new HttpErrorResponse(error, res);
    }
});

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
router.get('/read/:mail', async (req: Request, res: Response) => {
    try {
        const mail: string = req.params.mail;
        const result: User = await UserService.read(mail);
        return res.status(200).json(result);
    } catch (error) {
        return new HttpErrorResponse(error, res);;
    }
});


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
router.put('/update/:mail', async (req: Request, res: Response) => {
    try {
        const user = req["decoded"];
        const data = req.body;

        const mail: string = req.params.mail;
        data.updateUser = user.mail;

        const result: User = await UserService._update(data, mail)
        return res.status(200).json(result);
    } catch (error) {
        return new HttpErrorResponse(error, res);
    }
});


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
router.post('/find', async (req: Request, res: Response) => {
    try {
        const filter = req.body;
        const result: Object[] = await UserService.find({ ...filter })
        return res.status(200).json(result);
    } catch (error) {
        return new HttpErrorResponse(error, res);;
    }
});


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
router.delete('/delete', async (req: Request, res: Response) => {
    try {
        const mail: string | string[] = req.query.mail as string;
        const result: string = await UserService.delete(mail)
        return res.status(200).json(result);
    } catch (error) {
        return new HttpErrorResponse(error, res);;
    }
});


router.post('/login', async (req: Request, res: Response) => {
    try {
        const mail: string = req.body.mail;
        const password: string = req.body.password;

        // Überprüfe, ob der Benutzer existiert
        const user: any = await UserService.read(mail);

        // Vergleiche das Passwort mit dem gespeicherten Hash
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Ungültige E-Mail oder Passwort' });
        }

        // Generiere ein JWT-Token
        const token = jwt.sign({ mail: user.mail }, "-mortqunem-", { expiresIn: '1h' });

        // Gebe das Token als Teil der Antwort zurück
        return res.status(200).json({ ...user.dataValues, token });
    } catch (error) {
        return new HttpErrorResponse(error, res);
    }
});




export { router as UserController }

