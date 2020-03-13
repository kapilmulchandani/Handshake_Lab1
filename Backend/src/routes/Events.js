var express = require('express');

var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');

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



router.post('/post-event', function(req,res){
        console.log("Inside Company Post Event Function");
        var sql = "INSERT INTO events (event_id, company_id, event_name, event_description, event_time, event_date, event_location, event_eligibility) VALUES ('"+req.body.EventIdData+"', '"+req.body.CompanyIdData+"', '"+req.body.EventTitleData+"', '" +req.body.EventDescriptionData+"', '"+ req.body.EventTimeData+"', '"+req.body.EventDateData+"', '"+ req.body.EventLocationData+"', '"+req.body.EventEligibilityData+ "');";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log('Success');
            res.end("Successful_Insertion");
        });
});

router.post('/register-event', function(req,res){
    console.log("Inside Student Register Event Function");
    var sql = "INSERT INTO event_attendance (student_id, event_id, company_id) VALUES ('"+req.body.StudentIdData+"', '"+req.body.EventIdData+"', '"+req.body.CompanyIdData+"');";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log('Success');
        res.end("Successful_Insertion");
    });
});

router.get('/get-events', function(req,res){
    console.log("Inside Student Get Events Function");
    var sql = "SELECT * FROM events"; 
    connection.query(sql, function (err, result) {
        if (err) throw err;

        let events = [];
        result.forEach(element => {
              events.push(element)
        });

        res.end(JSON.stringify({
            events
        }));
    });

});

router.post('/get-my-events', function(req,res){
    console.log("Inside Student Get My Events Function");
    var sql = "SELECT * FROM events where event_id in (SELECT event_id from event_attendance where student_id="+req.body.StudentIdData+")"; 
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


module.exports = router;
