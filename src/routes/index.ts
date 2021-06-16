import authRoutes from "./auth";
import productRoutes from "./product";

export default (app: any) => {
    authRoutes(app), productRoutes(app);
};
