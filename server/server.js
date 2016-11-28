require('dotenv').config();
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

io.on('connection', function(socket) {
  socket.on('login', function(name) {
    socket.name = name;
    socket.broadcast.emit('login', socket.name);
  });

  socket.on('disconnect', function() {
    socket.broadcast.emit('logout', socket.name);
  });

  socket.on('message', function(msg) {
    socket.broadcast.emit('message', msg);
  });
});

http.listen(process.env.PORT, function() {
  console.log(`listening on *:${process.env.PORT}`);
});
