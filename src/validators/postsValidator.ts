import {check} from "express-validator";

export const postsValidator = {
    "GET_POST": [
        check(['id'])
            .isNumeric()
            .withMessage('Invalid data type passed'),
    ],
    "CREATE_POST": [
        check(['title'])
            .isString()
            .withMessage('Invalid data type passed')
            .trim()
            .isLength({min: 1,max: 30})
            .withMessage('Min 1, Max 30 symbols'),
        check(['shortDescription'])
            .isString()
            .withMessage('Invalid data type passed')
            .trim()
            .isLength({min: 1,max: 100})
            .withMessage('Min 1, Max 100 symbols'),
        check(['content'])
            .isString()
            .withMessage('Invalid data type passed')
            .trim()
            .isLength({min: 1,max: 1000})
            .withMessage('Min 1, Max 1000 symbols'),
        check(['bloggerId'])
            .isNumeric()
            .withMessage('Invalid data type passed')
    ],
    "UPDATE_POST": [
        check(['title'])
            .isString()
            .withMessage('Invalid data type passed')
            .trim()
            .isLength({min: 1,max: 30})
            .withMessage('Min 1, Max 30 symbols'),
        check(['shortDescription'])
            .isString()
            .withMessage('Invalid data type passed')
            .trim()
            .isLength({min: 1,max: 100})
            .withMessage('Min 1, Max 100 symbols'),
        check(['content'])
            .isString()
            .withMessage('Invalid data type passed')
            .trim()
            .isLength({min: 1,max: 1000})
            .withMessage('Min 1, Max 1000 symbols'),
        check(['bloggerId'])
            .isNumeric()
            .withMessage('Invalid data type passed')
    ],
    "DELETE_POST": [
        check(['id'])
            .isNumeric()
            .withMessage('Invalid data type passed'),
    ],
}

