require('dotenv').config();
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('login', function(name) {
    console.log(`user login: ${name}`);
    socket.broadcast.emit('login', name);
  });
});

http.listen(process.env.PORT, function() {
  console.log(`listening on *:${process.env.PORT}`);
});
