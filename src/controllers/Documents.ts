import * as express from "express";
import { Request, Response } from 'express';
import { DocumentsService } from "../services/Documents";
import { HttpErrorResponse } from "../errorHandler/HttpErrorResponse";
import { CreateSchema, DeleteSchema } from "../schema/validator/file/file";
import { File } from "../schema/DB/FILE";
import joiValidator from "../middleware/joiValidator"
import config from "config";
import multer, { Multer } from "multer";
import path from "path";

const router: express.Router = express.Router();
const upload: Multer = multer({ dest: path.resolve(config.get("attachmentFolder"), "temp") });

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
router.post('/create', upload.array('files'), joiValidator(CreateSchema), async (req: Request, res: Response) => {
    try {

        const files = req.files as Express.Multer.File[];
        const user = req["decoded"];
        const data = req.body;

        data.createUser = user.mail;
        data.updateUser = user.mail;

        for (const file of files) {
            file.originalname = Buffer.from(file.originalname, "latin1").toString('utf8')
        }

        const result = await DocumentsService._create(files, data)
        return res.status(200).json(result);
    } catch (error) {
        return new HttpErrorResponse(error, res);
    }
});

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


router.get('/read/:rowid', async (req: Request, res: Response) => {
    try {
        const rowid: string = req.params.rowid;
        const result: File = await DocumentsService.read(rowid);
        return res.status(200).json(result);
    } catch (error) {
        return new HttpErrorResponse(error, res);
    }
});

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
router.put('/update/:rowid', async (req: Request, res: Response) => {
    try {
        const user = req["decoded"];
        const data = req.body;

        const rowid: string = req.params.rowid;
        data.updateUser = user.mail;

        const result: File = await DocumentsService._update(data, rowid)
        return res.status(200).json(result);
    } catch (error) {
        return new HttpErrorResponse(error, res);
    }
});

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


router.post('/find', async (req: Request, res: Response) => {
    try {
        const filter = req.body;
        const result: Object[] = await DocumentsService.find({ ...filter })
        return res.status(200).json(result);
    } catch (error) {
        return new HttpErrorResponse(error, res);
    }
});


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
router.delete('/delete', joiValidator(DeleteSchema, null, "query"), async (req: Request, res: Response) => {
    try {
        const rowid: string | string[] = req.query.rowid as string | string[];
        const result: string = await DocumentsService.delete(rowid)
        return res.status(200).json(result);
    } catch (error) {
        return new HttpErrorResponse(error, res);
    }
});

export { router as DocumentController }

