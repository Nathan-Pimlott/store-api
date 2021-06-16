import * as Sequelize from "sequelize";

import { Product } from "../../models/product";
import { useGetProductById } from "./getById";
import { useGetProducts } from "./get";

export const getProductById = useGetProductById({ Product });
export const getProducts = useGetProducts({ Product, Sequelize });
