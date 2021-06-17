import * as Sequelize from "sequelize";

import { Product } from "../../models/product";
import { useGetProductById } from "./getById";
import { useGetProducts } from "./get";
import { useUpdateProduct } from "./update";
import { useCreateProduct } from "./create";

export const getProductById = useGetProductById({ Product });
export const getProducts = useGetProducts({ Product, Sequelize });
export const updateProduct = useUpdateProduct({ Product });
export const createProduct = useCreateProduct({ Product });
