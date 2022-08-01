import {NextFunction, Request, Response} from "express";
import {decode} from 'base-64';

export const baseAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers?.authorization;

        if (!authorization) {
            throw new Error('Bad credentials');
        }

        // example - Basic YWRtaW46cXdlcnR5
        const encodeString = authorization.split(" ");

        // example - Basic
        const firstTokenPart = encodeString[0];
        // example - YWRtaW46cXdlcnR5
        const secondTokenPart = encodeString[1];


        if (firstTokenPart !== "Basic") {
            throw new Error('Bad credentials');
        }


        const bytes = decode(secondTokenPart);

        const CREDENTIALS = `${process.env.ADMIN_LOGIN}:${process.env.ADMIN_PASSWORD}`;

        if (bytes !== CREDENTIALS) {
            throw new Error('Bad credentials');
        }

        next();
    } catch (e) {
        return res.sendStatus(401);
    }
}
