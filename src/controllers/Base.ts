import * as express from "express";
import * as winston from "winston";
import { Request, Response } from 'express';
import { BaseService } from "../services/Base";
import { findServiceName } from "../utils/findServiceName";
import { HttpErrorResponse } from "../errorHandler/HttpErrorResponse";

const router = express.Router();

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
router.post('/create', findServiceName, async (req: Request, res: Response) => {
    try {
        const user = req["decoded"];
        const data = req.body;

        data.createUser = user.mail;
        data.updateUser = user.mail;

        const result: any = await BaseService.create(data, req["SERVICE"]);
        return res.status(200).json(result);
    } catch (error) {
        return new HttpErrorResponse(error, res);
    }
});


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
router.get('/read/:rowid', findServiceName, async (req: Request, res: Response) => {
    try {
        const rowid: string = req.params.rowid;
        const result: Object = await BaseService.read(rowid, req["SERVICE"])
        return res.status(200).json(result);
    } catch (error) {
        return new HttpErrorResponse(error, res);
    }
});


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
router.post('/find', findServiceName, async (req: Request, res: Response) => {
    try {
        const filter = req.body;
        const result: Object[] = await BaseService.find(filter, req["SERVICE"])
        return res.status(200).json(result);
    } catch (error) {
        return new HttpErrorResponse(error, res);
    }
});

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
router.put('/update/:rowid', findServiceName, async (req: Request, res: Response) => {
    try {
        const user = req["decoded"];
        const data = req.body;

        const rowid: string = req.params.rowid;
        data.updateUser = user.mail;

        const result: Object = await BaseService.update(data, { rowid }, req["SERVICE"])
        return res.status(200).json(result);
    } catch (error) {
        return new HttpErrorResponse(error, res);
    }
});

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
router.delete('/delete/:rowid', findServiceName, async (req: Request, res: Response) => {
    try {
        const rowid = req.params.rowid;
        const result: string = await BaseService.delete({ rowid }, req["SERVICE"])
        return res.status(200).json(result);
    } catch (error) {
        return new HttpErrorResponse(error, res);
    }
});

export { router as BaseController };