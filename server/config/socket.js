module.exports = function(io, activeUsers, guestList, messages) {
  var connectionCount = 0;

  io.on('connection', function(socket) {
    connectionCount++;
    socket.broadcast.emit('count', connectionCount);

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
      connectionCount--;
      socket.broadcast.emit('count', connectionCount);
      if (socket.name) {
        socket.broadcast.emit('logout', socket.name);
        activeUsers.splice(activeUsers.indexOf(socket.name), 1);
      }
    });

    socket.on('message', function(msg) {
      socket.broadcast.emit('message', msg);
      messages.push(msg);
    });

    socket.on('active', function() {
      socket.emit('count', connectionCount);
    });
  });
};
