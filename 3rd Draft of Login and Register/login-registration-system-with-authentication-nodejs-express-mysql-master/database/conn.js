var mysql = require("mysql")
require('dotenv').config();

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "login_registration_system"
})

conn.connect((err) => {
    if (err) throw err;
    console.log("Database Connected...")
})

module.exports = conn;

// The following modification was changes to the properties on the “mysql.createconnection” function.