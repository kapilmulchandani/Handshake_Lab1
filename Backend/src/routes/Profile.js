var express = require('express');
// var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
// app.set('view engine', 'ejs');
const router = express.Router();
const path = require("path");
const multer = require("multer");
//MySQL config

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




router.post('/getProfileData', function (req, resp) {

    // var sql = "INSERT INTO student_info (FirstName, LastName, EmailId, CollegeName, Password) VALUES ('"+req.body.FirstNameData+"', '"+ req.body.LastNameData+"', '"+req.body.EmailIdData+"', '"+ req.body.CollegeData+"', '"+req.body.PasswordData+"')";
    // var journeyData = "SELECT Journey FROM Student_Details where EmailId='" + email + "';";
    var sql = "SELECT * FROM student_details where emailid='" + req.body.EmailIdData + "';";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        if (result.length == 1) {
            resp.writeHead(200, {
                'Content-Type': 'application/json'
            });
            resp.end(JSON.stringify({
                EmailId: result[0].emailid,
                journey: result[0].journey,
                education: result[0].education,
                workExp: result[0].work_exp,
                orgAchieve: result[0].org_achieve,
                skills: result[0].skills,
                mobile_number: result[0].mobile_number
            }));
        }
    });

});

router.post('/getProfileData', function (req, resp) {

    // var sql = "INSERT INTO student_info (FirstName, LastName, EmailId, CollegeName, Password) VALUES ('"+req.body.FirstNameData+"', '"+ req.body.LastNameData+"', '"+req.body.EmailIdData+"', '"+ req.body.CollegeData+"', '"+req.body.PasswordData+"')";
    // var journeyData = "SELECT Journey FROM Student_Details where EmailId='" + email + "';";
    var sql = "SELECT * FROM student_details where emailid='" + req.body.EmailIdData + "';";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        if (result.length == 1) {
            resp.writeHead(200, {
                'Content-Type': 'application/json'
            });
            resp.end(JSON.stringify({
                EmailId: result[0].emailid,
                journey: result[0].journey,
                education: result[0].education,
                workExp: result[0].work_exp,
                orgAchieve: result[0].org_achieve,
                skills: result[0].skills,
                mobile_number: result[0].mobile_number
            }));
        }
    });

});

router.post('/getStudentProfileData', function (req, resp) {

    // var sql = "INSERT INTO student_info (FirstName, LastName, EmailId, CollegeName, Password) VALUES ('"+req.body.FirstNameData+"', '"+ req.body.LastNameData+"', '"+req.body.EmailIdData+"', '"+ req.body.CollegeData+"', '"+req.body.PasswordData+"')";
    // var journeyData = "SELECT Journey FROM Student_Details where EmailId='" + email + "';";
    var sql = "SELECT * FROM student_details where student_id='" + req.body.StudentIdData + "';";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        if (result.length == 1) {
            resp.writeHead(200, {
                'Content-Type': 'application/json'
            });
            resp.end(JSON.stringify({
                EmailId: result[0].emailid,
                journey: result[0].journey,
                education: result[0].education,
                workExp: result[0].work_exp,
                orgAchieve: result[0].org_achieve,
                skills: result[0].skills,
                mobile_number: result[0].mobile_number
            }));
        }
    });

});




router.post('/save', function (req, res) {
    var sql = "UPDATE student_details SET journey = '" + req.body.journeyData + "', education = '" + req.body.educationData + "', work_exp = '" + req.body.workExpData + "',org_achieve = '" + req.body.orgAchieveData + "', skills = '" + req.body.skillsData + "', mobile_number = " + req.body.mobile_numberData + " WHERE emailid = '" + req.body.emailData + "';";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        // console.log("1 record inserted");
        res.end("Successful_Updation");
    });
});


const storage = multer.diskStorage({
    destination: "../../public/uploads/",
    filename: function (req, file, cb) {
        cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
});
router.post('/uploadprofile', upload.single('myImage'), function (req, res) {
    console.log("Request ---", req.body);
    console.log("Request file ---", req.file);//Here you get file.
    res.end(JSON.stringify({
        success: true,
        message: "profile updated",
        profilefilepath: req.file.filename
    }))
});

router.post('/delete', function (req, res) {

});


router.get('/create', function (req, res) {

});

module.exports = router;
// app.listen(3001);
//start your server on port 3001
