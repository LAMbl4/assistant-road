// app.js
var express = require('express');
var app = express();
var db = require('./db');

// ADD THESE TWO LINES
var UserController = require('./user/UserController');
app.use('/users', UserController);

var MarkerController = require('./markers/markerController');
app.use('/markers', MarkerController);

module.exports = app;