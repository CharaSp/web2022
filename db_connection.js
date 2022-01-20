const mysql = require('mysql2');


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'web_database'
})

const promisePool = pool.promise(); // gia na mporeis na knaeis async await κλησεις στην βαση

module.exports = { promisePool }