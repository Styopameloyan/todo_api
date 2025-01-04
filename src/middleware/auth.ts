import jwt from 'jsonwebtoken';
import { HttpErrorResponse } from '../errorHandler/HttpErrorResponse';
import { UnauthorizedError } from '../errorHandler/UnauthorizedError';
import { UserService } from '../services/User';

const brauchtKeinToken = [
    "/api/users/register",
    "/api/users/login"
];

export const authentication = async (req, res, next): Promise<any> => {
    if (brauchtKeinToken.indexOf(req.path) != -1) return next();

    const token = req.headers.authorization || req.headers.Authorization || req.headers.token;
    if (!token) {
        const error = new UnauthorizedError("No token provided.");
        return new HttpErrorResponse(error, res);
    }

    jwt.verify(token.split(" ")[1] || token, "-mortqunem-", (err, decoded) => {
        if (err) {
            const error = new UnauthorizedError("Unauthorized");
            return new HttpErrorResponse(error, res);
        }
        UserService.read(decoded.mail)
            .then(user => {
                req.decoded = user;
                return next();
            })


        // .catch(() => Response.error(res, "Benutzer nicht gefunden", 500));
    });
};
