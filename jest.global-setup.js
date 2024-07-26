const mysql = require('mysql2/promise');

module.exports = async () => {
    process.env.NODE_ENV = 'test';
    process.env.DB_HOST = 'localhost';
    process.env.DB_USER = 'root';
    process.env.DB_PASSWORD = 'root';
    process.env.DB_NAME = 'mydatabase_test';
    process.env.PORT = 3003;

    const dbConfig = {
        host: 'localhost',
        user: 'root',
        password: 'root',
    };

    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.query('CREATE DATABASE IF NOT EXISTS mydatabase_test');
        await connection.query('USE mydatabase_test');
        await connection.query(`
            CREATE TABLE IF NOT EXISTS files (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                city VARCHAR(255) NOT NULL,
                country VARCHAR(255) NOT NULL,
                favorite_sport VARCHAR(255) NOT NULL
            )
        `);

        await connection.end();
    } catch (err) {
        console.error('Error in global setup:', err);
    }
};
