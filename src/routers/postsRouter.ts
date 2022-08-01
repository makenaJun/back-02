import {Router} from "express";
import {postsValidator} from "../validators/postsValidator";
import {postController} from "../controllers/postsController";
import {validateRequestParamsMiddleware} from "../middlewares/validateRequestParamsMiddleware";
import {baseAuthMiddleware} from "../middlewares/baseAuthMiddleware";

export const postsRouter = Router();

postsRouter.get('', postController.getAll);
postsRouter.get('/:id', postsValidator["GET_POST"], validateRequestParamsMiddleware, postController.getById);
postsRouter.post('', baseAuthMiddleware, postsValidator["CREATE_POST"], validateRequestParamsMiddleware, postController.create);
postsRouter.put('/:id', baseAuthMiddleware, postsValidator["UPDATE_POST"], validateRequestParamsMiddleware, postController.update);
postsRouter.delete('/:id', baseAuthMiddleware, postsValidator["DELETE_POST"], validateRequestParamsMiddleware, postController.delete);

