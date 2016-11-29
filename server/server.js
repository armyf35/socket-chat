var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var activeUsers = [];
var guestList = [];
var messages = [];

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express, activeUsers, guestList, messages);
require('./config/socket.js')(io, activeUsers, guestList, messages);

http.listen(process.env.PORT || 8000, function() {
  console.log(`listening on *:${process.env.PORT || 8000}`);
});
