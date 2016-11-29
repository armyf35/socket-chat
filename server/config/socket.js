const User = require('../models/user');
const Messages = require('../collections/messages');

module.exports = function(io, activeUsers) {

  io.on('connection', function(socket) {
    socket.on('login', function(name) {
      socket.name = name;
      socket.broadcast.emit('login', name);
      activeUsers.push(name);
    });

    socket.on('logout', function(name) {
      socket.broadcast.emit('logout', name);
      activeUsers.splice(activeUsers.indexOf(name), 1);
    });

    socket.on('disconnect', function() {
      if (socket.name) {
        socket.broadcast.emit('logout', socket.name);
        activeUsers.splice(activeUsers.indexOf(socket.name), 1);
      }
    });
  });
};
