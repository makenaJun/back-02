import {validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";
import {ErrorResponseType} from "../types/ErrorTypes";

export const validateRequestParamsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array();

    if (errors.length === 0) {
        return next()
    }

    const fields: CustomObjectType<string, boolean> = {};

    const errorsMessages =  errors
        .map(el => ({message: el.msg, field: el.param}))
        .filter(el => {
            if (fields[el.field]) {
                return false;
            } else {
                fields[el.field] = true;
                return true;
            }
        })

    const response: ErrorResponseType = {
        errorsMessages: errorsMessages
    }

    res.status(400).send(response);
}


export type CustomObjectType<T extends string, D> = {
    [key in T]: D;
}