import * as Sequelize from 'sequelize';
import { sequelize } from '../../server';

export const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: Sequelize.STRING,
    forename: Sequelize.STRING,
    surname: Sequelize.STRING
});

export default User.sync({alter: true});