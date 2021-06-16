import * as Sequelize from "sequelize";
import { sequelize } from "../../server";

export const User = sequelize.define(
    "user",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        forename: Sequelize.STRING,
        surname: Sequelize.STRING,
    },
    {
        indexes: [
            {
                unique: true,
                fields: ["email"],
            },
        ],
    }
);

export default User.sync({ alter: true });
