import { Request, Response } from "express";
import { getProducts } from "../../controller/product/get";
import { getProductById } from "../../controller/product";
import { createProduct } from "../../controller/product/create";

export default (app: any) => {
    app.post("/api/product/get", async (req: Request, res: Response) => {
        const products = await getProducts(req.body);
        res.send(products);
    });

    app.get("/api/product/get/:id", async (req: Request, res: Response) => {
        const product = await getProductById(req.params.id);
        res.send({
            product,
        });
    });

    app.post("/api/product/create", async (req: Request, res: Response) => {
        const created = await createProduct(req.body);
        res.send({
            created,
        });
    });
};
