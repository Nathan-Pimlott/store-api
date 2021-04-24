import authRoutes from './auth';
import productRoutes from './product';
import productSizeRoutes from './productSize';

export default (app: any) => {
    authRoutes(app),
    productRoutes(app),
    productSizeRoutes(app)
}