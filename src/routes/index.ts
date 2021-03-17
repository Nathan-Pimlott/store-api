import { Request, Response } from 'express'
import { authenticate, createUser } from "../controller/authenticate";

export default (app: any) => {
    app.post('/user/authenticate', async (req: Request, res: Response) => {
        console.log('Req: ', req.body);
        const authenticated = await authenticate(req.body);
        res.send({
            authenticated
        });
    });

    app.post('/user/create', async (req: Request, res: Response) => {
        console.log('Req: ', req.body);
        const created = await createUser(req.body);
        res.send({
            created
        });
    });

    app.post('/user/update', async (req: Request, res: Response) => {
        console.log('Req: ', req.body);
        const created = await createUser(req.body);
        res.send({
            created
        });
    });
}