const mysql = require('mysql2/promise');

module.exports = async () => {
    const dbConfig = {
        host: 'localhost',
        user: 'root',
        password: 'root',
    };
    const connection = await mysql.createConnection(dbConfig);
    await connection.query('DROP DATABASE IF EXISTS mydatabase_test');
    await connection.end();
};
