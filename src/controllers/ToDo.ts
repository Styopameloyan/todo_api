import * as express from "express";
import { HttpErrorResponse } from "../errorHandler/HttpErrorResponse";
import { Request, Response } from 'express';
import { ToDoService } from "../services/ToDo";
import ToDoSchema from "../schema/DB/TODO";
const router = express.Router();


router.post('/create', async (req: Request, res: Response) => {
    try {
        const user = req["decoded"];
        const data = req.body;

        data.createUser = user.mail;
        data.updateUser = user.mail;

        const result: ToDoSchema = await ToDoService._create(data);
        return res.status(200).json(result.dataValues);
    } catch (error) {
        return new HttpErrorResponse(error, res);
    }
});

router.get('/read/:rowid', async (req: Request, res: Response) => {
    try {
        const rowid: string = req.params.rowid;
        const result: ToDoSchema = await ToDoService._read(rowid);
        return res.status(200).json(result.dataValues);
    } catch (error) {
        return new HttpErrorResponse(error, res);
    }
});

router.put('/update/:rowid', async (req: Request, res: Response) => {
    try {
        const user = req["decoded"];
        const data = req.body;

        const rowid: string = req.params.rowid;
        data.updateUser = user.mail;

        const result: ToDoSchema = await ToDoService._update(data, rowid)
        return res.status(200).json(result.dataValues);
    } catch (error) {
        return new HttpErrorResponse(error, res);
    }
});

router.post('/find', async (req: Request, res: Response) => {
    try {
        const filter = req.body;
        const result: ToDoSchema[] = await ToDoService._find({ ...filter })
        return res.status(200).json(result);
    } catch (error) {
        return new HttpErrorResponse(error, res);
    }
});

router.delete('/delete/:rowid', async (req: Request, res: Response) => {
    try {
        const rowid: string = req.params.rowid;
        const result: ToDoSchema = await ToDoService._delete(rowid)
        return res.status(200).json(result.dataValues);
    } catch (error) {
        return new HttpErrorResponse(error, res);
    }
});

export { router as ToDoController };

