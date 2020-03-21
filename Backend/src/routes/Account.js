var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');

const path = require("path");
const multer = require("multer");

const router = express.Router();
//MySQL config

var mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'kapil123',//password of your mysql db
    database:'handshake_schema'
    });

connection.connect(function(err) {
    if (err) throw err
    
});

router.post('/login',function(req,resp){    
    console.log("Inside Login Post Request");
        console.log(req.body.EmailIdData);
        console.log(req.body.PasswordData);
        console.log("Connected!");
        var sql = "select * from student_info where emailid='"+req.body.EmailIdData+"' and password='"+req.body.PasswordData+"';";
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
                    EmailId: result[0].emailid,
                    StudentId: result[0].student_id
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
});



router.post('/get-major', function(req,res){

    var sql = "SELECT major from student_info where student_id="+req.body.StudentIdData+";";
    connection.query(sql, function(err, result){
        if (err) throw err;
        res.end(JSON.stringify({
            StudentMajor: result
        }));
    })   
});  

router.post('/signup', function(req,res){
        console.log("Inside Post SignUp Function");
        // console.log(req.body);
        // console.log("Connected!");
        var sql = "INSERT INTO student_info (first_name, last_name, emailid, college_name, password, major) VALUES ('"+req.body.FirstNameData+"', '"+ req.body.LastNameData+"', '"+req.body.EmailIdData+"', '"+ req.body.CollegeData+"', '"+req.body.PasswordData+"', '"+req.body.MajorData+"')";
        var sql2 = "INSERT INTO student_details (student_id, emailid, city, dob, journey, education, work_exp, org_achieve, skills, mobile_number, profile_picture) VALUES ((SELECT student_id from student_info where emailid='" + req.body.EmailIdData + "'),'"+req.body.EmailIdData+"', '', '2020-02-02', '', '', '', '', '', 99211, '');";
        
        connection.query(sql, function (err, result) {
            if (err) throw err;
            // console.log("1 record inserted");
            // res.end("Successful_Insertion");
        });
        connection.query(sql2, function (err, result) {
            if (err) throw err;
            // console.log("2nd table insertion done");
            res.end("Successful_Insertion");
        });
});





router.get('/create', function(req,res){
    console.log("Request ---", req.body);
    console.log("Request file ---", req.file);//Here you get file.
       
});

module.exports = router;
