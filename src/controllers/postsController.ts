import {Request, Response} from "express";
import {ErrorResponseType} from "../types/ErrorTypes";
import {bloggers} from "./bloggersController";

let posts: PostType[] = [
    {
        id: 1,
        title: 'My first video',
        shortDescription: "shortDescription content",
        content: "Full content",
        bloggerId: 1
    }
]

export const postController = {
    getAll(req: Request, res: Response) {
        const postsView: PostViewType[] = posts.map(el => {
            const blogger = bloggers.find(b => b.id === el.bloggerId);

            return {
                ...el,
                bloggerName: blogger?.name ?? ""
            }
        })
        res.status(200).send(postsView);
    },

    getById(req: Request, res: Response) {
        const {id} = req.params;

        const post = posts.find(el => el.id === +id);

        if (!post) {
            return res.sendStatus(404);
        }

        const blogger = bloggers.find(b => b.id === post.bloggerId);

        const postView: PostViewType = {
            ...post,
            bloggerName: blogger?.name ?? ""
        }

        res.status(200).send(postView);
    },

    create(req: Request, res: Response) {
        const {title, shortDescription, content, bloggerId} = req.body;

        const blogger = bloggers.find(b => b.id === bloggerId);

        if (!blogger) {
            const error: ErrorResponseType = {
                errorsMessages: [
                    {
                        message: "Blogger id is not correct",
                        field: "bloggerId"
                    }
                ]
            }

            return res.status(400).send(error);
        }

        const newPost: PostType = {
            id: Date.now(),
            title: title.trim(),
            content: content.trim(),
            bloggerId: bloggerId,
            shortDescription: shortDescription.trim(),
        };

        posts.push(newPost);


        const postView: PostViewType = {
            ...newPost,
            bloggerName: blogger.name
        }

        res.status(201).send(postView);
    },
    update(req: Request, res: Response) {
        const {id} = req.params;
        const {title, shortDescription, content, bloggerId} = req.body;

        const post = posts.find(el => el.id === +id);

        if (!post) {
            const error: ErrorResponseType = {
                errorsMessages: [
                    {
                        message: "Post id is not correct",
                        field: "id"
                    }
                ]
            }

            return res.status(404).send(error);
        }

        const blogger = bloggers.find(el => el.id === bloggerId);

        if (!blogger) {
            const error: ErrorResponseType = {
                errorsMessages: [
                    {
                        message: "Blogger id is not correct",
                        field: "bloggerId"
                    }
                ]
            }

            return res.status(400).send(error);
        }

        posts = posts.map(el => {
            if (el.id === +id) {
                return {
                    ...el,
                    title: title.trim(),
                    shortDescription: shortDescription.trim(),
                    bloggerId: bloggerId,
                    content: content.trim(),
                };
            }
            return el;
        });

        res.sendStatus(204);
    },
    delete(req: Request, res: Response) {
        const {id} = req.params;

        const filteredPosts = posts.filter(el => el.id !== +id);

        if (filteredPosts.length === posts.length) {
            return res.sendStatus(404);
        }

        posts = filteredPosts;

        res.sendStatus(204);
    }
}


// TYPES

type PostType = {
    id: number,
    title: string,
    shortDescription: string,
    content: string,
    bloggerId: number,
}

type PostViewType = {
    id: number,
    title: string,
    shortDescription: string,
    content: string,
    bloggerId: number,
    bloggerName: string,
}