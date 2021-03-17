const { Pool, Client } = require('pg')

const dbpath = {
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'abc@123',
    port: 5432

};

const pool = new Pool(dbpath)

pool.connect().then(function (client) {
    console.log('PostgreSQL Connected');
    client.release();
}).catch(function (err) {
    console.log('PostgreSQL Connect failed');
    console.log(err);
});

const query = function (text, params, callback) {
    return pool.query(text, params, callback);
}

module.exports = {
    query
}