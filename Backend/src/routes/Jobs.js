var express = require('express');

var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');

const router = express.Router();

var mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kapil123',//password of your mysql db
    database: 'handshake_schema'
});

connection.connect(function (err) {
    if (err) throw err

});

router.get('/get-jobs', function(req,res){
    console.log("Inside Student Get Events Function");
    var sql = "SELECT * FROM jobs_details"; 
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

router.post('/get-my-jobs', function(req,res){
    console.log("Inside Student Get My Jobs Function");
    var sql = "SELECT * FROM jobs_details where job_id in (SELECT job_id from applications where student_id="+req.body.StudentIdData+") AND company_id in (SELECT company_id from applications where student_id="+req.body.StudentIdData+ ")"; 
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


router.post('/apply-job', function(req,res){
    console.log("Inside Student Apply Job Function");
    var sql = "INSERT INTO applications (student_id, job_id, company_id, application_status) VALUES ('"+req.body.StudentIdData+"', '"+req.body.JobIdData+"', '"+req.body.CompanyIdData+"', '"+ req.body.ApplicationStatusData +"');";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log('Success');
        res.end("Successful_Insertion");
    });
});


module.exports = router;