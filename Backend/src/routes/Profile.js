var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');

//MySQL config

var mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'1234',//password of your mysql db
    database:'Students'
    });


//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });


app.get('/getProfileData',function(req,res){    
    console.log("Inside Login Post Request");
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        // var sql = "INSERT INTO student_info (FirstName, LastName, EmailId, CollegeName, Password) VALUES ('"+req.body.FirstNameData+"', '"+ req.body.LastNameData+"', '"+req.body.EmailIdData+"', '"+ req.body.CollegeData+"', '"+req.body.PasswordData+"')";
        var sql = "SELECT * FROM Student_Details";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            res.end("Successful_Insertion");
        });
        });
});

//Route to get All Books when user visits the Home Page
app.get('/home', function(req,res){
    connection.connect(function(err) {
        if(err) throw err;
        console.log('Connected!');
        var sql = 'SELECT * FROM student_info';
        connection.query(sql, function(err, result) {
            if (err) throw err;
            console.log('1 record inserted');
            res.end('SUccessful_insertion');
        })
    })
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    res.end(JSON.stringify(books));         
});



app.post('/signup', function(req,res){
        console.log("Inside Post SignUp Function");
        console.log(req.body);
        connection.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = "INSERT INTO student_info (FirstName, LastName, EmailId, CollegeName, Password) VALUES ('"+req.body.FirstNameData+"', '"+ req.body.LastNameData+"', '"+req.body.EmailIdData+"', '"+ req.body.CollegeData+"', '"+req.body.PasswordData+"')";
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                res.end("Successful_Insertion");
            });
            });
});

app.post('/delete', function(req,res){
   
});


app.get('/create', function(req,res){

});

    
//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");