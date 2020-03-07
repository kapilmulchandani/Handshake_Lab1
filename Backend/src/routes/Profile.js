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
    user:'root',
    password:'kapil123',//password of your mysql db
    database:'handshake_schema'
    });

connection.connect(function(err) {
   if (err) throw err
        
});


//use cors to allow cross origin resource sharing
// router.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// //use express session to maintain session data
// router.use(session({
//     secret              : 'cmpe273_kafka_passport_mongo',
//     resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
//     saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
//     duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
//     activeDuration      :  5 * 60 * 1000
// }));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
// router.use(bodyParser.json());

// //Allow Access Control
// router.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//     res.setHeader('Cache-Control', 'no-cache');
//     next();
//   });


  router.post('/getProfileData',function(req,resp){    
    // console.log(req);
    console.log("Inside Profile Data Request");
        // var sql = "INSERT INTO student_info (FirstName, LastName, EmailId, CollegeName, Password) VALUES ('"+req.body.FirstNameData+"', '"+ req.body.LastNameData+"', '"+req.body.EmailIdData+"', '"+ req.body.CollegeData+"', '"+req.body.PasswordData+"')";
        // var journeyData = "SELECT Journey FROM Student_Details where EmailId='" + email + "';";
        var sql = "SELECT * FROM student_details where emailid='"+req.body.EmailIdData+"';";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            if(result.length == 1){
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

router.post('/save', function(req,res){
    var sql = "UPDATE student_details SET journey = '" + req.body.journeyData + "', education = '" + req.body.educationData+ "', work_exp = '" + req.body.workExpData+ "',org_achieve = '" + req.body.orgAchieveData+"', skills = '"+req.body.skillsData+"', mobile_number = "+req.body.mobile_numberData+" WHERE emailid = '"+req.body.emailData+"';";
    connection.query(sql, function (err, result) {
     if (err) throw err;
     // console.log("1 record inserted");
     res.end("Successful_Updation");
 });
 });


 const storage = multer.diskStorage({
    destination: "../../public/uploads/",
    filename: function(req, file, cb){
       cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
 });

 let upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
 });
 router.post('/upload', upload.single('myImage'), function(req, res){
    console.log("Request ---", req.body);
    console.log("Request file ---", req.file);//Here you get file.
    res.end(JSON.stringify({
        success: true,
        message: "profile updated",
        profilefilepath: req.file.filename
    }))
});

router.post('/delete', function(req,res){
   
});


router.get('/create', function(req,res){

});

module.exports = router;    
// app.listen(3001);
//start your server on port 3001
