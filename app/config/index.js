const mysql = require('mysql');

const config = {
    app: {
        port: process.env.PORT || 8000,
    },
    database: {
        host: 'localhost',
        user: 'root',
        port: 3306,
        password: '',
        database: 'qlcv_dev',
    },
    jwt: {
        secret: "qlcv-secret-key"
    }
};

const connection = mysql.createPool(config.database);

module.exports = { config, connection };