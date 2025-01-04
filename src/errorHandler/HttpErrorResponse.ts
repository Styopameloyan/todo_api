
import * as winston from "winston";
import { Response } from "express";
import { ValidationError, UniqueConstraintError, ForeignKeyConstraintError, DatabaseError } from "sequelize";
import { NotFoundError } from "./NotFoundError";
import { SequelizeError } from "./SequelizeError";
import { UnauthorizedError } from "./UnauthorizedError";

export class HttpErrorResponse {
    private message: string;
    private status: number;
    private response: Response;

    constructor(error: Error, res: Response) {
        this.response = res;

        this.resolveError(error);
        this.send();
    }

    private send = () => {
        return this.response.status(this.status).send(this.message);
    }

    private resolveError = (error: any) => {
        this.message = error.message || error;
        this.status = 500;

        if (error instanceof NotFoundError) {
            this.message = error.message;
            this.status = 404;
        }
        if (error instanceof UnauthorizedError) {
            this.message = error.message;
            this.status = 401;
        }
        if (error instanceof ValidationError) {
            this.message = SequelizeError.validationError(error);
            this.status = 400;
        }
        if (error instanceof UniqueConstraintError) {
            this.message = SequelizeError.uniqueConstraintError(error);
            this.status = 409;
        }
        if (error instanceof ForeignKeyConstraintError) {
            this.message = SequelizeError.foreignKeyConstraintError(error);
            this.status = 409;
        }
        if (error instanceof DatabaseError) {
            this.message = SequelizeError.databaseError(error);
            this.status = 500;
        }

    }
} 