interface IUseGetProductById {
    Product: any;
}

export function useGetProductById({ Product }: IUseGetProductById) {
    return async function getProductById(id: string) {
        try {
            const where = {
                id,
            };

            const productResponse = await Product.findOne({
                where,
                limit: 1,
            });

            if (!productResponse.dataValues) {
                throw Error();
            }

            return productResponse.dataValues;
        } catch (error) {
            throw Error("Unable to find product by id.");
        }
    };
}
