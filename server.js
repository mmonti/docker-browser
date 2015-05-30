/// <reference path="typings/node/node.d.ts"/>

// server.js
// set up ========================
var express  = require('express');
var app      = express();       
var morgan = require('morgan'); 
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var restler = require('restler');

// configuration =================
var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public/'));             // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// ## CORS middleware
// 
// see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
//app.use(allowCrossDomain);

// routes
app.get("/startDockerService", function(req, res) {
    var cp = require('child_process');
    cp.exec('service docker start', function (error, stdout, stderr) {
        if(error !== null) {
            console.log('exec error: ' + error);
            res.status(500);
            res.json({ status:"KO" });
        }
    }); 
    res.status(200);
	res.json({ status:"OK" });
});

app.get("/stopDockerService", function(req, res) {
    var cp = require('child_process');
    cp.exec('service docker stop', function (error, stdout, stderr) {
        if(error !== null) {
            console.log('exec error: ' + error);
            res.status(500);
            res.json({ status:"KO" });
        }
    }); 
    res.status(200);
	res.json({ status:"OK" });
});

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("Docker Browser is up and running on port:"+port);