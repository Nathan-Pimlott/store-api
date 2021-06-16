import { IGetProducts } from "../../../types";

interface IUseGetProducts {
    Product: any;
    Sequelize: any;
}

export function useGetProducts({ Product, Sequelize }: IUseGetProducts) {
    return async function getProducts(filters: IGetProducts) {
        try {
            const where = {
                name: filters.name || {
                    [Sequelize.Op.like]: `%%`,
                },
                gender: filters.gender || {
                    [Sequelize.Op.like]: `%%`,
                },
                price: {
                    [Sequelize.Op.gte]: filters.priceMin || 0,
                    [Sequelize.Op.lte]: filters.priceMax || 9999,
                },
            };

            const productResponse = await Product.findAll({
                where,
                limit: 24,
                offset: (filters.page - 1 || 0) * 24,
            });

            const count = await Product.count({
                where,
            });

            return {
                products:
                    productResponse.length > 0
                        ? productResponse.map((product) => product.dataValues)
                        : [],
                count,
            };
        } catch (error) {
            throw Error("Unable to find products.");
        }
    };
}
