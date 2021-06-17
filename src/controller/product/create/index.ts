interface IUseCreateProduct {
    Product: any;
}

interface ICreateProduct {
    name: string;
    description: string;
    img: string;
    gender?: "mens" | "womens";
    priceMin?: string;
    priceMax?: string;
    color?: string;
}

export function useCreateProduct({ Product }: IUseCreateProduct) {
    return async function createProduct(body: ICreateProduct) {
        try {
            const response = await Product.create(body);

            if (!response.dataValues?.id) {
                throw Error();
            }

            return true;
        } catch (error) {
            throw Error("Unable to create product.");
        }
    };
}
