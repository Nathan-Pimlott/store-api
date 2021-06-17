import { Request, Response } from "express";
import {
    getProducts,
    getProductById,
    updateProduct,
    createProduct,
} from "../../controller/product";

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

    app.put("/api/product", async (req: Request, res: Response) => {
        const success = await updateProduct(req.body);
        res.send({
            success,
        });
    });

    app.post("/api/product", async (req: Request, res: Response) => {
        const created = await createProduct(req.body);
        res.send({
            created,
        });
    });
};
