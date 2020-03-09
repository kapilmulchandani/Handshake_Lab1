var express = require('express');

var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');

const router = express.Router();

router.post('/search-students', function (req, res) {
    var sql = "select * from s'" + req.body.journeyData + "', education = '" + req.body.educationData + "', work_exp = '" + req.body.workExpData + "',org_achieve = '" + req.body.orgAchieveData + "', skills = '" + req.body.skillsData + "', mobile_number = " + req.body.mobile_numberData + " WHERE emailid = '" + req.body.emailData + "';";
    
    var sql2 = "select * from student_details a INNER JOIN student_info b ON a.student_id = b.student_id WHERE  ;"
    connection.query(sql, function (err, result) {
        if (err) throw err;
        // console.log("1 record inserted");
        res.end("Successful_Updation");
    });
});