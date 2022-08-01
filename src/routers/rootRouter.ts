import {Router} from "express";
import {bloggersRouter} from "./blogersRouter";
import {postsRouter} from "./postsRouter";

export const rootRouter = Router();

rootRouter.use('/bloggers', bloggersRouter);
rootRouter.use('/posts', postsRouter);
