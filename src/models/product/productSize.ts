import * as Sequelize from 'sequelize';

import { sequelize } from '../../server';

// Define the product size model
export const ProductSize = sequelize.define('productSize', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    }
});

ProductSize.associate = function(models) {
    ProductSize.belongsToMany(models.product, {
        through: 'product_productSize',
        as: 'products',
        foreignKey: 'productSizeId'
    });
};

// Export the synced model
export default ProductSize.sync({alter: true});