import {Product} from '../../models/product';
import {ProductSize} from '../../models/product/productSize';

interface IGetProductSizeBody {
    name: string;
};

export const getProductSizes = async (body: IGetProductSizeBody) => {
    try {
        // Find products matching the filter
        let productSizeRes = await ProductSize.findAll({
            where: {
                ...body
            },
            limit: 30,
        });

        console.log('Product Res: ', productSizeRes);
        
        // Return a list of filtered product sizes
        return true;
    } catch (error) {
        // Return an empty array if no product sizes are found
        return [];
    }
}