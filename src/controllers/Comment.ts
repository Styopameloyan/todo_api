import * as express from "express";
import { Request, Response } from 'express';
import { HttpErrorResponse } from "../errorHandler/HttpErrorResponse";
import { CommentService } from "../services/Comment";
import CommentSchema from "../schema/DB/COMMENT";
const router = express.Router();


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
router.post('/create', async (req: Request, res: Response) => {
    try {
        const user = req["decoded"];
        const data = req.body;

        data.createUser = user.mail;
        data.updateUser = user.mail;

        const result: CommentSchema = await CommentService._create(data);
        return res.status(200).json(result.dataValues);
    } catch (error) {
        return new HttpErrorResponse(error, res);
    }
});

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
router.get('/read/:rowid', async (req: Request, res: Response) => {
    try {
        const rowid: string = req.params.rowid;
        const result: CommentSchema = await CommentService.read(rowid);
        return res.status(200).json(result.dataValues);
    } catch (error) {
        return new HttpErrorResponse(error, res);
    }
});

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
router.put('/update/:rowid', async (req: Request, res: Response) => {
    try {
        const user = req["decoded"];
        const data = req.body;

        const rowid: string = req.params.rowid;
        data.updateUser = user.mail;

        const result: CommentSchema = await CommentService._update(data, rowid)
        return res.status(200).json(result.dataValues);
    } catch (error) {
        return new HttpErrorResponse(error, res);
    }
});

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
router.post('/find', async (req: Request, res: Response) => {
    try {
        const filter = req.body;
        const result: CommentSchema[] = await CommentService.find({ ...filter })
        return res.status(200).json(result);
    } catch (error) {
        return new HttpErrorResponse(error, res);
    }
});

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
router.delete('/delete', async (req: Request, res: Response) => {
    try {
        const rowid: string = req.query.rowid as string;
        const result: string = await CommentService.delete(rowid)
        return res.status(200).json(result);
    } catch (error) {
        return new HttpErrorResponse(error, res);
    }
});

export { router as CommentController }

