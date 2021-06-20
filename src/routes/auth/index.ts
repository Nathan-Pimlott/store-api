import { Request, Response } from "express";
import {
    authenticate,
    createUser,
    updateUserPassword,
} from "../../controller/user";

export default (app: any) => {
    app.post("/api/user/authenticate", async (req: Request, res: Response) => {
        const { authenticated, user } = await authenticate(req.body);
        res.send({
            authenticated,
            user,
        });
    });

    app.post("/api/user/create", async (req: Request, res: Response) => {
        const created = await createUser(req.body);
        res.send({
            created,
        });
    });

    app.put(
        "/api/user/update-password",
        async (req: Request, res: Response) => {
            const created = await updateUserPassword(req.body);
            res.send({
                created,
            });
        }
    );
};
