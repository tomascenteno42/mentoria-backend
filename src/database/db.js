const mysql = require('mysql2/promise');
const config = process.env;

/**
 *
 * @param {*} sql mysql string operation
 */
const query = async (sql) => {
    const connection = await mysql.createConnection({
        host: config.DB_HOST,
        user: config.DB_USER,
        password: config.DB_PASSWORD,
        database: config.DB_NAME,
    });

    const [results] = await connection.execute(sql);

    return results;
};

module.exports = {
    query,
};
