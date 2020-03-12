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
    host: 'localhost',
    user:'root',
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



router.get('/create', function(req,res){
    console.log("Request ---", req.body);
    console.log("Request file ---", req.file);//Here you get file.
       
});

module.exports = router;
