import { Product } from '../../models/product';

interface IUpdateProductBody {
    id: number;
    name?: string;
    description?: string;
    img?: string;
    gender?: 'mens' | 'womens';
    priceMin?: string;
    priceMax?: string;
    color?: string;
    sizes?: ISize[];
};

interface ISize {
    id: number;
    name: string;
}

export const updateProduct = async (body: IUpdateProductBody) => {
    try {
        // Try to update the new user
        const response = await Product.update(body);
        console.log('Response: ', response);
        
        
        // Return true if product is updated successfully
        return response?.dataValues?.id;
    } catch (error) {
        console.error(error);
        // Return false if the product isn't successfully updated
        return false;
    }
}