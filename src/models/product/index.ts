import * as Sequelize from 'sequelize';
import { sequelize } from '../../server';

// Define the product model
export const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    description: Sequelize.STRING,
    img: Sequelize.STRING,
    gender: Sequelize.STRING,
    color: Sequelize.STRING,
    price: Sequelize.FLOAT
});

// Many to many product <-> productSize
Product.associate = function(models) {
    Product.hasMany(models.productSize, {
        through: 'product_productSize',
        as: 'productSizes',
        foreignKey: 'productId'
    });
};

// Export the synced model
export default Product.sync({alter: true});
