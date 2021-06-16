import { Product } from "../../models/product";

interface ICreateProductBody {
    name: string;
    description: string;
    img: string;
    gender?: "mens" | "womens";
    priceMin?: string;
    priceMax?: string;
    color?: string;
    sizes: ISize[];
}

interface ISize {
    id: number;
    name: string;
}

export async function createProduct(body: ICreateProductBody) {
    try {
        // Try to create the new user
        // const response = await Product.create(body);
        const response = await Product.create({
            name: "Ladies home shirt",
            description: "Ladies home shirt 2021/22",
            img: "https://store.liverpoolfc.com/media/catalog/product/cache/236ed41ccdfb36d5c5b8767303b43c6f/d/b/db2539r-379.jpg",
            gender: "womens",
            color: "red",
            price: "69.99",
        });

        // Return true if product is created successfully
        return !!response?.dataValues?.id;
    } catch (error) {
        console.error(error);
        // Return false if the product isn't successfully created
        return false;
    }
}
