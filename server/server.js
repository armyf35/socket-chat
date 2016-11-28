require('dotenv').config();
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var activeUsers = [];
var messages = [];

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express, activeUsers, messages);

io.on('connection', function(socket) {
  socket.on('login', function(name) {
    socket.name = name;
    socket.broadcast.emit('login', name);
    activeUsers.push(name);
  });

  socket.on('disconnect', function() {
    socket.broadcast.emit('logout', socket.name);
    activeUsers.splice(activeUsers.indexOf(socket.name), 1);
  });

  socket.on('message', function(msg) {
    socket.broadcast.emit('message', msg);
    messages.push(msg);
  });
});

http.listen(process.env.PORT, function() {
  console.log(`listening on *:${process.env.PORT}`);
});
