import { Request, Response } from 'express'
import { getProducts } from "../../controller/product/get";
import { createProductSize } from '../../controller/productSize/create';
// import { getProduct } from "../../controller/product/get";
// import { createProduct } from "../../controller/product/create";

export default (app: any) => {
    app.post('/api/product-size/get', async (req: Request, res: Response) => {
        const products = await getProducts(req.body);
        res.send({
            products
        });
    });

    // app.get('/api/product/get/:id', async (req: Request, res: Response) => {
    //     const created = await getProduct(req.params.id);
    //     res.send({
    //         product
    //     });
    // });

    app.post('/api/product-size/create', async (req: Request, res: Response) => {
        const created = await createProductSize(req.body);
        res.send({
            created
        });
    });
}