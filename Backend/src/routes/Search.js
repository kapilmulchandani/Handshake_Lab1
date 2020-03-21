var express = require('express');

var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');

const router = express.Router();

var mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'database-2.cqbjhdeezpcd.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'kapil123',//password of your mysql db
    database: 'handshake_schema'
});

connection.connect(function (err) {
    if (err) throw err

});
function createQuery(data) {
    var query = "SELECT a.student_id AS student_id, b.emailid AS email_id, first_name, last_name, college_name, skills  FROM student_details a  INNER JOIN student_info b  ON a.student_id = b.student_id WHERE 1=1"
    
    console.log(Object.keys(data));

    for (let key of Object.keys(data)) {
        console.log(key)
        if (data[key]) {
            if (Array.isArray(data[key])) {
                if (data[key] === undefined || data[key].length == 0) {
                    continue
                }
                query += " AND ( 1=0 "
                for (let val of data[key]) {
                    val = val.toLowerCase();
                    query += ` OR ${key} like "%,${val},%"`
                }
                query += ")"
            } else {
                query += ` AND ${key}="${data[key]}"`
            }
        }
    }
    return query;
}
var i =0;
router.post('/search-students', function (req, res) {
    console.log("REQ", req.body);
    var sql = createQuery(req.body);
    connection.query(sql, function (err, result) {
        if (err) throw err;
        // console.log("1 record inserted");
        console.log(result);

        let testData = [];
        result.forEach(element => {
              testData.push(element)
        });

        console.log("TEST_DATA ", i, testData);
        i++;
        res.end(JSON.stringify({
            // StudentIdData: result[0].student_id,
            // FirstNameData: result[0].first_name,
            // LastNameData: result[0].last_name,
            // EmailIdData: result[0].email_id,
            // CollegeNameData: result[0].college_name,
            // SkillsData: result[0].skills.substring(1, result[0].skills.length-1)
            testData
        }));

    });
});

router.post('/searchQuery', function(req,res){
    console.log("Inside Search Jobs Function");
    var sql = "SELECT * FROM jobs_details where title LIKE '%"+req.body.SearchTextData+"%'";
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


router.post('/searchEventsQuery', function(req,res){
    console.log("Inside Search Events Function");
    var sql = "SELECT * FROM events where event_name LIKE '%"+req.body.SearchTextData+"%'";
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

router.post('/filterQuery', function(req,res){
    console.log("Inside Filter Jobs Function");
    var sql = "SELECT * FROM jobs_details where job_category ='"+req.body.CategoryData+"'";
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


router.post('/filter-application-status-query', function(req,res){
    console.log("Inside Filter Application Status Jobs Function");
    var sql = "SELECT * FROM jobs_details where job_id in (SELECT job_id FROM applications WHERE student_id ="+req.body.StudentIdData +" AND application_status='"+req.body.ApplicationStatusData+"') AND company_id in (SELECT company_id FROM applications WHERE student_id ="+req.body.StudentIdData +" AND application_status='"+req.body.ApplicationStatusData+"')";
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

module.exports = router;