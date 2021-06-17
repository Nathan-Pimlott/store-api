interface IUseUpdateProduct {
    Product: any;
}

interface IUpdateProduct {
    id: number;
    name?: string;
    description?: string;
    img?: string;
    gender?: "mens" | "womens";
    priceMin?: string;
    priceMax?: string;
    color?: string;
}

export function useUpdateProduct({ Product }: IUseUpdateProduct) {
    return async function updateProduct(body: IUpdateProduct) {
        try {
            const response = await Product.update(
                {
                    name: body.name,
                    description: body.description,
                    img: body.img,
                    gender: body.gender,
                    priceMin: body.priceMin,
                    priceMax: body.priceMax,
                    color: body.color,
                },
                {
                    where: { id: body.id },
                }
            );

            // Product is not found
            if (response[0] === 0) {
                throw Error();
            }

            return true;
        } catch (error) {
            throw Error("Unable to update product.");
        }
    };
}
