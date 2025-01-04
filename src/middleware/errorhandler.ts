import * as winston from "winston";
import { NextFunction, Request, Response } from "express";

function globalErrorHandler(error: Error, request: Request, response: Response, next: NextFunction) {
    const message = error.message || error || "Internal Server Error";

    winston.error(message);
    response.status(500).send(message);
}

export default globalErrorHandler;
