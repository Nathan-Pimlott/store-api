import * as Sequelize from "sequelize";
import { sequelize } from "../../db";

export const Product = sequelize.define(
    "product",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        img: Sequelize.STRING,
        gender: Sequelize.STRING,
        color: Sequelize.STRING,
        price: Sequelize.FLOAT,
    },
    {
        indexes: [
            {
                unique: true,
                fields: ["name"],
            },
        ],
    }
);

export default Product.sync({ alter: true });
