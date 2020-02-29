var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
const router = express.Router();
//MySQL config

var mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'1234',//password of your mysql db
    database:'Students'
    });

connection.connect(function(err) {
    if (err) throw err
    
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


//Route to handle Post Request Call
app.post('/login',function(req,resp){    
    console.log("Inside Login Post Request");
        console.log(req.body.EmailIdData);
        console.log(req.body.PasswordData);
        console.log("Connected!");
        var sql = "select * from student_info where EmailId='"+req.body.EmailIdData+"' and Password='"+req.body.PasswordData+"';";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            if(result.length == 1){
                // console.log(result.length);
                resp.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                resp.end(JSON.stringify({
                    success: true,
                    message: "Successfull",
                    EmailId: result[0].EmailId
                }));
            }
            else{
                resp.writeHead(401, {
                    'Content-Type': 'application/json'
                });
                resp.end(JSON.stringify({
                    success: false,
                    message: "The username or password you entered is incorrect."
                }));
            }     
        });
        //     console.log("1 record inserted");
        //     res.end("Successful_Insertion");
        
});

//Route to get All Books when user visits the Home Page
app.get('/home', function(req,res){

    console.log("Inside Home Login");    
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    res.end(JSON.stringify(books));         
});


app.post('/getProfileData',function(req,resp){    
    console.log(req);
    console.log("Inside Profile Data Request");
        // var sql = "INSERT INTO student_info (FirstName, LastName, EmailId, CollegeName, Password) VALUES ('"+req.body.FirstNameData+"', '"+ req.body.LastNameData+"', '"+req.body.EmailIdData+"', '"+ req.body.CollegeData+"', '"+req.body.PasswordData+"')";
        // var journeyData = "SELECT Journey FROM Student_Details where EmailId='" + email + "';";
        var sql = "SELECT * FROM Student_Details where EmailId='"+req.body.EmailIdData+"';";
        console.log(req.body.EmailIdData);
        connection.query(sql, function (err, result) {
            if (err) throw err;
            if(result.length == 1){
                resp.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                resp.end(JSON.stringify({
                    EmailId: result[0].EmailId,
                    journey: result[0].Journey
                }));
        }
        });

});

app.post('/signup', function(req,res){
        console.log("Inside Post SignUp Function");
        console.log(req.body);
        console.log("Connected!");
        var sql = "INSERT INTO student_info (FirstName, LastName, EmailId, CollegeName, Password) VALUES ('"+req.body.FirstNameData+"', '"+ req.body.LastNameData+"', '"+req.body.EmailIdData+"', '"+ req.body.CollegeData+"', '"+req.body.PasswordData+"')";
        var sql2 = "INSERT INTO student_details (EmailId, City, DOB, Journey, Education, WorkExp, OrgAchieve, Skills, Mobile_Number) VALUES ('"+req.body.EmailIdData+"', '', '2020-02-02', '', '', '', '', '', 99211);";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            // res.end("Successful_Insertion");
        });
        connection.query(sql2, function (err, result) {
            if (err) throw err;
            console.log("2nd table insertion done");
            res.end("Successful_Insertion");
        });
});

app.post('/update', function(req,res){
    console.log("Inside Post SignUp Function");
    console.log(req.body);
    console.log("Connected!");
    var sql = "INSERT INTO student_info (FirstName, LastName, EmailId, CollegeName, Password) VALUES ('"+req.body.FirstNameData+"', '"+ req.body.LastNameData+"', '"+req.body.EmailIdData+"', '"+ req.body.CollegeData+"', '"+req.body.PasswordData+"')";
    var sql2 = "INSERT INTO student_details (EmailId, City, DOB, Journey, Education, WorkExp, OrgAchieve, Skills, Mobile_Number) VALUES ('"+req.body.EmailIdData+"', '', '2020-02-02', '', '', '', '', '', 99211);";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        // res.end("Successful_Insertion");
    });
    connection.query(sql2, function (err, result) {
        if (err) throw err;
        console.log("2nd table insertion done");
        res.end("Successful_Insertion");
    });
});

app.post('/delete', function(req,res){
   
});


app.get('/create', function(req,res){

});


// module.exports = router;
//start your server on port 3001
app.listen(3001);