/**
* Module dependencies.
*/
const express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
//const methodOverride = require('method-override');
const session = require('express-session');

//file upload:
const fileUpload = require('express-fileupload')

const app = express();
const mysql = require('mysql');
let bodyParser=require("body-parser");
let connection = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',//appuser
              password : '',//app2027
              database : 'userdetail'
            });
 
connection.connect();
 
global.db = connection;
 
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))

//link the CSS style sheets and JavaScript files
app.use(express.static(path.join(__dirname, 'public')));

//file upload:
app.use(fileUpload());

app.use(session({
              secret: 'keyboard cat',
              resave: false,
              saveUninitialized: true,
              cookie: { maxAge: 60000 }
            }))
 
          

// development only
app.get('/', routes.home);//call for main index page <- used to be routes.home

app.get('/signup', user.signup);//call for signup page
app.post('/signup', user.signup);//call for signup post 
app.get('/login', routes.index);//call for login page
app.post('/login', user.login);//call for login post

app.get('/signupCoach',user.signupCoach)//call for signup coach page
app.post('/signupCoach', user.signupCoach)//call for signup coach page

app.get('/home/dashboard', user.dashboard);//call for dashboard page after login
app.get('/home/logout', user.logout);//call for logout
app.get('/home/profile',user.profile);//to render users profile

//render the profile after the user uploads an image:
app.post('/home/profile',user.editprofile);

//render the Search for Player Page:
app.get('/home/sap', user.sap);
app.post('/home/sap', user.sap);

// app.get('/home/view', (req, res) => {
//   const viewId = req.query.viewId;
//   res.send(`Hello, your id is ${viewId}`);
// });

//render the view another user's profile page:
app.get('/home/view', user.view_profile);

//Middleware
app.listen(8080)
