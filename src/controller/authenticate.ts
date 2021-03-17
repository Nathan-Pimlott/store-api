import * as bcrypt from 'bcrypt';

import connection from '../server/connection';

interface IAuthenticateBody {
    email: string;
    password: string;
};

export const authenticate = async (body: IAuthenticateBody) => {
    const Connection = await connection();
    const response = await Connection.query(
        `SELECT * FROM user WHERE email = "${body.email}" LIMIT 1`
    );
    const matchedEmail = response[0][0] ?
        response[0][0] :
        {};
    return await bcrypt.compare(body.password, matchedEmail.password);
}

interface ICreateUserBody {
    email: string;
    password: string;
};


export const createUser = async (body: ICreateUserBody) => {
    const Connection = await connection();
    const response = await Connection.query(
        `INSERT INTO user (email, password) VALUES ("${body.email}", "${body.password}");`
    );
    return body.email && body.password ? true : false;
}

interface IUpdateUserBody {
    email: string;
    currentPassword: string;
    newPassword: string;
};

export const updateUser = async (body: IUpdateUserBody) => {
    const Connection = await connection();
    const response = await Connection.query(
        `SELECT * FROM user WHERE email = "${body.email}" LIMIT 1`
    );
    const matchedEmail = response[0][0] ?
        response[0][0] :
        {};
    const correctPassword = await bcrypt.compare(body.currentPassword, matchedEmail.password);
    if (correctPassword) {
        await Connection.query(
            `UPDATE user SET password = "${body.newPassword}" WHERE password = "${body.email}"`
        );
        return true
    }
    return false;
}

