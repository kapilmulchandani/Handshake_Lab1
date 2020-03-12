let express = require("express");
let bodyParser = require("body-parser");
let session = require('express-session');
let cookieParser = require('cookie-parser');
let cors = require('cors');
let expressValidator = require("express-validator");

let account = require("./src/routes/Account");
let profile = require("./src/routes/Profile");
let company = require("./src/routes/Company");
let search = require("./src/routes/Search");
let events = require("./src/routes/Events");
let jobs = require("./src/routes/Jobs");

let app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());
app.use(session({
    secret              : 'askjfn2r|e123asjk1@vhdas%539*EQ46',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

 app.use(bodyParser.urlencoded({
     extended: true,
     limit: 1024 * 1024 *5
   }));
app.use(bodyParser.json({limit:1024 * 1024 *5}));
//app.use(express.static(__dirname + "/public"));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

// app.use(expressValidator())
app.use("/", account);
app.use("/", profile);
app.use("/", company);
app.use("/", search);
app.use("/", events);
app.use("/", jobs);

let server = app.listen(3001, function () {
    console.log("Server listening on port 3001");
});