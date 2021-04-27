import { Product } from '../../models/product';

interface ICreateProductBody {
    name: string;
    description: string;
    img: string;
    gender?: 'mens' | 'womens';
    priceMin?: string;
    priceMax?: string;
    color?: string;
    sizes: ISize[];
};

interface ISize {
    id: number;
    name: string;
}

export const createProduct = async (body: ICreateProductBody) => {
    try {
        // Try to create the new user
        const response = await Product.create(body);
        console.log('Response: ', response);
        
        
        // Return true if product is created successfully
        return !!response?.dataValues?.id;
    } catch (error) {
        console.error(error);
        // Return false if the product isn't successfully created
        return false;
    }
}