"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpErrorResponse_1 = require("../errorHandler/HttpErrorResponse");
const UnauthorizedError_1 = require("../errorHandler/UnauthorizedError");
const User_1 = require("../services/User");
const brauchtKeinToken = [
    "/api/users/register",
    "/api/users/login"
];
const authentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (brauchtKeinToken.indexOf(req.path) != -1)
        return next();
    const token = req.headers.authorization || req.headers.Authorization || req.headers.token;
    if (!token) {
        const error = new UnauthorizedError_1.UnauthorizedError("No token provided.");
        return new HttpErrorResponse_1.HttpErrorResponse(error, res);
    }
    jsonwebtoken_1.default.verify(token.split(" ")[1] || token, "-mortqunem-", (err, decoded) => {
        if (err) {
            const error = new UnauthorizedError_1.UnauthorizedError("Unauthorized");
            return new HttpErrorResponse_1.HttpErrorResponse(error, res);
        }
        User_1.UserService.read(decoded.mail)
            .then(user => {
            req.decoded = user;
            return next();
        });
        // .catch(() => Response.error(res, "Benutzer nicht gefunden", 500));
    });
});
exports.authentication = authentication;
//# sourceMappingURL=auth.js.map