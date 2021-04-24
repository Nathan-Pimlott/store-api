import {ProductSize} from '../../models/product/productSize';

interface ICreateProductSizeBody {
    name: string;
};

export const createProductSize = async (body: ICreateProductSizeBody) => {
    try {
        console.log('In create');
        
        // Try to create the new product size
        const response = await ProductSize.create({
            name: body.name,
        });

        console.log('Response: ', response);
        
        // Return true if product is created successfully
        return !!response?.dataValues?.id;
    } catch (error) {
        console.error(error)
        // Return false if the product isn't successfully created
        return false;
    }
}