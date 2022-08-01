import {Router} from "express";
import {BloggersController} from "../controllers/bloggersController";
import {bloggersValidator} from "../validators/bloggersValidator";
import {validateRequestParamsMiddleware} from "../middlewares/validateRequestParamsMiddleware";


export const bloggersRouter = Router();

bloggersRouter.get('', BloggersController.getAll);
bloggersRouter.get('/:id', bloggersValidator['GET_BLOGGER'], validateRequestParamsMiddleware, BloggersController.getById);
bloggersRouter.post('', bloggersValidator['CREATE_BLOGGER'], validateRequestParamsMiddleware, BloggersController.create);
bloggersRouter.put('/:id', bloggersValidator['UPDATE_BLOGGER'], validateRequestParamsMiddleware, BloggersController.update);
bloggersRouter.delete('/:id', bloggersValidator['DELETE_BLOGGER'], validateRequestParamsMiddleware, BloggersController.delete);

