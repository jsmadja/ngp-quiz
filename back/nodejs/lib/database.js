const Mysql = require('mysql');
const Promise = require('bluebird');
const config = require('config');

const connection = Mysql.createConnection({
    host: config.get('db.host'),
    user: config.get('db.user'),
    port: config.get('db.port'),
    password: config.get('db.password'),
    database: config.get('db.database'),
});
connection.connect();

setInterval(() => connection.query('SELECT 1'), 5000);

const Database = {
    query: (sql) => new Promise((resolve, reject) => {
        connection.query(sql, (err, rows) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    })
};

module.exports = Database;
