const mysql = require('mysql2')
require('dotenv').config()

const conn = mysql.createConnection({
    user: process.env.DBUSER,
    port: process.env.DBPORT,
    database: process.env.DBNAME,
    password: process.env.DBPASS,
}).promise();


conn.connect().then(()=> console.log('DB Connected')).catch((err)=> console.log(err))




module.exports = conn;