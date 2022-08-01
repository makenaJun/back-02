import {Request, Response} from "express";

export let bloggers: BloggerType[] = [
    {
        id: 1,
        name: 'makena',
        youtubeUrl: "https://www.youtube.com/channel/UCXqXPXR57SyRKNDaRqpkJZQ",
    }
]

export const BloggersController = {
    getAll(req: Request, res: Response) {
        res.status(200).send(bloggers);
    },

    getById(req: Request, res: Response) {
        const {id} = req.params;

        const blogger = bloggers.find(el => el.id === +id);

        if (!blogger) {
            return res.sendStatus(404);
        }

        res.status(200).send(blogger);
    },

    create(req: Request, res: Response) {
        const {name, youtubeUrl} = req.body;

        const newBlogger: BloggerType = {
            id: Date.now(),
            name: name.trim(),
            youtubeUrl: youtubeUrl.trim(),
        };

        bloggers.push(newBlogger);

        res.status(201).send(newBlogger);
    },
    update(req: Request, res: Response) {
        const {id} = req.params;
        const {name, youtubeUrl} = req.body;

        const blogger = bloggers.find(el => el.id === +id);

        if (!blogger) {
            return res.sendStatus(404);
        }

        bloggers = bloggers.map(el => {
            if (el.id === +id) {
                return {
                    ...el,
                    name: name,
                    youtubeUrl: youtubeUrl
                };
            }
            return el;
        });

        res.sendStatus(204);
    },
    delete(req: Request, res: Response) {
        const {id} = req.params;

        const filteredBloggers = bloggers.filter(el => el.id !== +id);

        if (filteredBloggers.length === bloggers.length) {
            return res.sendStatus(404);
        }

        bloggers = filteredBloggers;

        res.sendStatus(204);
    }
}


// TYPES

type BloggerType = {
    id: number,
    name: string,
    youtubeUrl: string,
}

