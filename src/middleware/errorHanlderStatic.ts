import * as winston from "winston";
import { NextFunction, Request, Response } from "express";

function errorHandlerStatic(error: Error, request: Request, response: Response, next: NextFunction) {
    const message = error.message || error || "Internal Server Error";

    winston.error("Static Middleware: " + message);
    next();
}

export default errorHandlerStatic;
