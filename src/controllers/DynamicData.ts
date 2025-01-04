import * as express from "express";
import { HttpErrorResponse } from "../errorHandler/HttpErrorResponse";
import { DynamicDataService } from "../services/DynamicData";
import DynamicDataSchema from "../schema/DB/DYNAMICDATA";
import { Request, Response } from 'express';
const router = express.Router();


/**
* @swaggerPath
*
* /dynamicdata/create:
*   post:
*     tags:
*       - DynamicData
*     security:
*       - Bearer: []
*     summary: Erstellt einen Eintrag in der Tabelle DYNAMICDATA.
*     description: Felder die Pflicht sind [className]. 
*     requestBody: 
*       content:
*        application/json:
*          schema:
*            type: object
*            example: {"className": "Test"}
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

        const result: DynamicDataSchema = await DynamicDataService._create(data);
        return res.status(200).json(result.dataValues);
    } catch (error) {
        return new HttpErrorResponse(error, res);
    }
});

/**
* @swaggerPath
*
* /dynamicdata/read/{rowid}:
*  get:
*    tags:
*      - DynamicData
*    security:
*      - Bearer: []
*    summary: Liest einen Datensatz
*    description: Dieser Webservice liefert einen einzigen Datensatz. Falls Datensatz nicht vorhanden, wird ein Fehler ausgegeben
*    parameters: 
*      -  name: rowid
*         description: rowid ist der PK von DynamicData
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
        const result: DynamicDataSchema = await DynamicDataService.read(rowid);
        return res.status(200).json(result.dataValues);
    } catch (error) {
        return new HttpErrorResponse(error, res);
    }
});

/**
* @swaggerPath
*
* /dynamicdata/update/{rowid}:
*  put:
*    tags:
*      - DynamicData
*    security:
*      - Bearer: []
*    summary: Bearbeitet einen Datensatz
*    parameters: 
*      - name: rowid
*        description: rowid ist der PK von DynamicData
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
*             example: { "string1_50": "Testwert2" }
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

        const result: DynamicDataSchema = await DynamicDataService._update(data, rowid)
        return res.status(200).json(result.dataValues);
    } catch (error) {
        return new HttpErrorResponse(error, res);
    }
});

/**
* @swaggerPath
*
* /dynamicdata/find:
*  post:
*    tags:
*      - DynamicData
*    security:
*      - Bearer: []
*    summary: Filtert Datensätze von DynamicData
*    description: Der FIND ist etwas anders als READ. Hier wird immer ein ARRAY zurückgegeben, auch ohne treffer. 
*                 Alle DynamicData Einträge haben zusätzlich die [FILES] als Relation.
*    requestBody: 
*      content:
*        application/json:
*          schema:
*            type: object
*            example: { "string1_50": "Testwert" }
*    responses:
*      "200":
*        description: Ausgabe erfolgreich 
*      "401":
*        description: Nicht authentifiziert
*/
router.post('/find', async (req: Request, res: Response) => {
    try {
        const filter = req.body;
        const result: DynamicDataSchema[] = await DynamicDataService.find({ ...filter })
        return res.status(200).json(result);
    } catch (error) {
        return new HttpErrorResponse(error, res);
    }
});

/**
* @swaggerPath
*
* /dynamicdata/delete:
*   delete:
*     tags:
*       - DynamicData
*     security:
*       - Bearer: []
*     summary: Löscht einen Datensatz von DynamicData
*     parameters:
*       - name: rowid
*         description: rowid ist der PK von DynamicData
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
        const result: string = await DynamicDataService.delete(rowid)
        return res.status(200).json(result);
    } catch (error) {
        return new HttpErrorResponse(error, res);
    }
});

export { router as DynamicDataController }

