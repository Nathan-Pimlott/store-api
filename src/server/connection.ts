import * as mysql from 'mysql2/promise';

export default async () => {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'store'
    });
};