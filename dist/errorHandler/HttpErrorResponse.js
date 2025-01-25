"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpErrorResponse = void 0;
const sequelize_1 = require("sequelize");
const NotFoundError_1 = require("./NotFoundError");
const SequelizeError_1 = require("./SequelizeError");
const UnauthorizedError_1 = require("./UnauthorizedError");
class HttpErrorResponse {
    constructor(error, res) {
        this.send = () => {
            return this.response.status(this.status).send(this.message);
        };
        this.resolveError = (error) => {
            this.message = error.message || error;
            this.status = 500;
            if (error instanceof NotFoundError_1.NotFoundError) {
                this.message = error.message;
                this.status = 404;
            }
            if (error instanceof UnauthorizedError_1.UnauthorizedError) {
                this.message = error.message;
                this.status = 401;
            }
            if (error instanceof sequelize_1.ValidationError) {
                this.message = SequelizeError_1.SequelizeError.validationError(error);
                this.status = 400;
            }
            if (error instanceof sequelize_1.UniqueConstraintError) {
                this.message = SequelizeError_1.SequelizeError.uniqueConstraintError(error);
                this.status = 409;
            }
            if (error instanceof sequelize_1.ForeignKeyConstraintError) {
                this.message = SequelizeError_1.SequelizeError.foreignKeyConstraintError(error);
                this.status = 409;
            }
            if (error instanceof sequelize_1.DatabaseError) {
                this.message = SequelizeError_1.SequelizeError.databaseError(error);
                this.status = 500;
            }
        };
        this.response = res;
        this.resolveError(error);
        this.send();
    }
}
exports.HttpErrorResponse = HttpErrorResponse;
//# sourceMappingURL=HttpErrorResponse.js.map