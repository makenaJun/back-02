import {check} from "express-validator";

export const bloggersValidator = {
    "GET_BLOGGER": [
        check(['id'])
            .isNumeric()
            .withMessage('Invalid data type passed'),
    ],
    "CREATE_BLOGGER": [
        check(['name'])
            .isString()
            .withMessage('Invalid data type passed')
            .trim()
            .isLength({min: 1, max: 15})
            .withMessage('Min 1, Max 15 symbols'),
        check(['youtubeUrl'])
            .isURL()
            .withMessage('Not correct url')
            .trim()
            .isLength({min: 1, max: 100})
            .withMessage('Min 1, Max 100 symbols'),
    ],
    "UPDATE_BLOGGER": [
        check(['id'])
            .isNumeric()
            .withMessage('Invalid data type passed'),
        check(['name'])
            .isString()
            .withMessage('Invalid data type passed')
            .trim()
            .isLength({min: 1, max: 15})
            .withMessage('Min 1, Max 15 symbols'),
        check(['youtubeUrl'])
            .isURL()
            .withMessage('Not correct url')
            .trim()
            .isLength({min: 1, max: 100})
            .withMessage('Min 1, Max 100 symbols'),
    ],
    "DELETE_BLOGGER": [
        check(['id'])
            .isNumeric()
            .withMessage('Invalid data type passed'),
    ],
}

