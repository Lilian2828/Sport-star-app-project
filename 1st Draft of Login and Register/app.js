const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');

dotenv.config({path: './.env'});

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// Parese URL-encoded bodies
app.use(express.urlencoded({ extended: false}));
// Parse JSON bodies
app.use(express.json());

app.set('view engine', 'hbs');

db.connect( (error) => {
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log("My SQL IS CONNETCED")
    }
})

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(8000, () => {
    console.log("Sever is starting on Port 8000")
});