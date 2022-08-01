import {Router} from "express";
import {BloggersController} from "../controllers/bloggersController";
import {bloggersValidator} from "../validators/bloggersValidator";
import {validateRequestParamsMiddleware} from "../middlewares/validateRequestParamsMiddleware";
import {baseAuthMiddleware} from "../middlewares/baseAuthMiddleware";


export const bloggersRouter = Router();

bloggersRouter.get('', BloggersController.getAll);
bloggersRouter.get('/:id', bloggersValidator['GET_BLOGGER'], validateRequestParamsMiddleware, BloggersController.getById);
bloggersRouter.post('', baseAuthMiddleware, bloggersValidator['CREATE_BLOGGER'], validateRequestParamsMiddleware, BloggersController.create);
bloggersRouter.put('/:id', baseAuthMiddleware, bloggersValidator['UPDATE_BLOGGER'], validateRequestParamsMiddleware, BloggersController.update);
bloggersRouter.delete('/:id', baseAuthMiddleware, bloggersValidator['DELETE_BLOGGER'], validateRequestParamsMiddleware, BloggersController.delete);

