var express = require('express');

var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');

const path = require("path");
const multer = require("multer");

const router = express.Router();
//MySQL config

var mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'database-2.cqbjhdeezpcd.us-east-1.rds.amazonaws.com',
    user:'admin',
    password:'kapil123',//password of your mysql db
    database:'handshake_schema'
    });

connection.connect(function(err) {
    if (err) throw err
    
});

router.post('/post-job', function(req,res){
        console.log("Inside Company Post SignUp Function");
        // console.log(req.body);
        // console.log("Connected!");
        var sql = "INSERT INTO jobs_details (job_id, company_id, title, posting_date, app_deadline, location, salary, job_description, job_category) VALUES ('"+req.body.JobIdData+"', '"+req.body.CompanyIdData+"', '" +req.body.JobTitleData+"', '"+ req.body.PostingDateData+"', '"+req.body.ApplicationDeadlineData+"', '"+ req.body.LocationData+"', '"+req.body.SalaryData+"', '" + req.body.JobDescriptionData+ "', '"+req.body.JobCategoryData+ "');";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log('Success');
            res.end("Successful_Insertion");
        });
});

router.post('/getCompanyProfileData', function(req,res){
    console.log("Inside Company Get Profile Function");
    var sql = "select * from company_details where company_id = '"+req.body.CompanyIdData+"';";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        if (result.length == 1) {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                CompanyName: result[0].name,
                CompanyEmailId: result[0].emailid,
                CompanyLocation: result[0].company_location,
                CompanyDescription: result[0].description,
                CompanyContactInfo: result[0].contact_info
            }));
            console.log(result);
        }
    });
});

router.post('/save-company-profile', function (req, res) {
    var sql = "UPDATE company_details SET description = '" + req.body.DescriptionData + "', contact_info = '" + req.body.ContactInfoData + "', company_location = '" + req.body.LocationData + "';";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        // console.log("1 record inserted");
        res.end("Successful_Updation");
    });
});

router.post('/company-login',function(req,resp){    
    console.log("Inside Company Login Post Request");
        console.log(req.body.EmailIdData);
        console.log(req.body.PasswordData);
        console.log("Connected!");
        var sql = "select * from company_details where emailid='"+req.body.EmailIdData+"' and password='"+req.body.PasswordData+"';";
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
                    CompanyId: result[0].company_id
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


router.post('/companysignup', function(req,res){
    console.log("Inside Company Post SignUp Function");
    var sql = "INSERT INTO company_details (name, emailid, password, company_location) VALUES ('"+req.body.CompanyNameData+"', '"+ req.body.EmailIdData+"', '"+req.body.PasswordData+"', '"+ req.body.LocationData+"')";
     connection.query(sql, function (err, result) {
        if (err) throw err;
        res.end("Successful_Insertion");
    });
});

router.post('/get-company-jobs', function(req,res){
    console.log("Inside Company Get My Jobs Function");
    var sql = "SELECT * FROM jobs_details where company_id="+req.body.CompanyIdData+";"; 
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);

        let jobs = [];
        result.forEach(element => {
              jobs.push(element)
        });

        res.end(JSON.stringify({
            jobs
        }));
    });
});


router.post('/get-company-events', function(req,res){
    console.log("Inside Company Get My Events Function");
    var sql = "SELECT * FROM events where company_id="+req.body.CompanyIdData+";"; 
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);

        let events = [];
        result.forEach(element => {
              events.push(element)
        });

        res.end(JSON.stringify({
            events
        }));
    });
});


router.post('/get-event-registrations', function(req,res){
    console.log("Inside Company Get My Event registrations Function");
    var sql = "SELECT * FROM student_info a INNER JOIN event_attendance b on a.student_id = b.student_id where company_id="+req.body.CompanyIdData+" AND event_id="+req.body.EventIdData+";"; 
    // SELECT * FROM student_details a INNER JOIN applications b on a.id = b.id
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);

        let students = [];
        result.forEach(element => {
              students.push(element)
        });

        res.end(JSON.stringify({
            students
        }));
    });
});


router.post('/get-applications', function(req,res){
    console.log("Inside Company Get My Applications Function");
    var sql = "SELECT * FROM student_info a INNER JOIN applications b on a.student_id = b.student_id where company_id="+req.body.CompanyIdData+" AND job_id="+req.body.JobIdData+";"; 
    // SELECT * FROM student_details a INNER JOIN applications b on a.id = b.id
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);

        let students = [];
        result.forEach(element => {
              students.push(element)
        });

        res.end(JSON.stringify({
            students
        }));
    });
});

module.exports = router;
