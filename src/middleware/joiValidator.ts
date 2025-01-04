import { Request, Response, NextFunction } from 'express';
import * as  Joi from "joi";

type target = "body" | "query" | "params";
const DefaultOptions: Joi.ValidationOptions = { abortEarly: false, stripUnknown: true, allowUnknown: true };

const validator = (schema: Joi.Schema, options: Joi.ValidationOptions = {}, target?: target) => {
    return (req: Request, res: Response, next: NextFunction) => {

        const data = getData(req, target);
        const result: Joi.ValidationResult = schema.validate(data, { ...DefaultOptions, ...options });

        if (result.error) return res.status(400).send(result.error.message);
        setData(req, result.value, target)
        next();
    }
}

const getData = (req: Request, target?: target): Object[] | Object => {
    if (target) return req[target];
    return { ...req.body, ...req.query, ...req.params }
}
const setData = (req: Request, value: any, target?: target): void => {
    if (target) req[target] = value;
}

export default validator;