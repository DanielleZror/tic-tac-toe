const API = require('./Api')
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded());

app.listen(8000, function () {
    console.log("Listening on port " + 8000)
    API.initApi(app)
});