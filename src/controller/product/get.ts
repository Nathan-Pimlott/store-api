import * as Sequelize from 'sequelize';

import {Product} from '../../models/product';
import {ProductSize} from '../../models/product/productSize';

interface IGetProductsBody {
    name?: string;
    description?: string;
    img?: string;
    gender?: 'mens' | 'womens';
    priceMin?: number;
    priceMax?: number;
    color?: string;
};

export const getProducts = async (body: IGetProductsBody) => {
    try {
        // Find products matching the filter
        let response = await Product.findAll({
            where: {
                name: {
                    [Sequelize.Op.like]: `%${body.name || ''}%`
                },
                price: {
                    [Sequelize.Op.gte]: body.priceMin || 0,
                    [Sequelize.Op.lte]: body.priceMax || 9999
                }
            },
            limit: 30,
            // include: [{
            //     model: ProductSize,
            //     as: 'productSizes'
            //   }]
        });
        
        // Return a list of filtered products
        return response.length > 0 ?
            response.map((product) => product.dataValues) : 
            [];
    } catch (error) {
        console.error(error);
        // Return an empty array if no products are found
        return [];
    }
}