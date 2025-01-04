import * as express from "express";
import { models } from "../schema/initSchemas";

const findServiceName = (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const url: string = req.baseUrl;
    const index: number = url.lastIndexOf("/");
    const serviceName: string = url.substring(index + 1, url.length).toUpperCase();
    const service: Object = models[serviceName];

    if (!service) return res.status(404).send(`Route: '${req.originalUrl}' not exist.`);
    req["SERVICE"] = service;
    return next();
};

export { findServiceName };