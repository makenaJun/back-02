import {NextFunction, Request, Response} from "express";
import {decode} from 'base-64';

export const baseAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers?.authorization;

        if (!authorization) {
            throw new Error('Bad credentials');
        }
        // Basic YWRtaW46cXdlcnR5
        const encodeString = authorization.split(" ")[1];

        const bytes = decode(encodeString);

        const CREDENTIALS = `${process.env.ADMIN_LOGIN}:${process.env.ADMIN_PASSWORD}`;

        if (bytes !== CREDENTIALS) {
            throw new Error('Bad credentials');
        }
        
        next();
    } catch (e) {
        res.sendStatus(401)
    }
}
