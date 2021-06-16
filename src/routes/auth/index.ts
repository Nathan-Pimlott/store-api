import { Request, Response } from "express";
import { authenticate } from "../../controller/user/authenticate";
import { createUser } from "../../controller/user/create";
import { updatePassword } from "../../controller/user/update";

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

    app.put("/api/user/update", async (req: Request, res: Response) => {
        const created = await updatePassword(req.body);
        res.send({
            created,
        });
    });
};
