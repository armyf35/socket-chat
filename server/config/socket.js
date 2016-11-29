module.exports = function(io, activeUsers, guestList, messages) {
  io.on('connection', function(socket) {
    socket.on('login', function(name) {
      socket.name = name;
      socket.broadcast.emit('login', name);
      activeUsers.push(name);
      if (name.substr(0, 5) === 'guest') {
        guestList.push(parseInt(name.substr(5)));
      }
    });

    socket.on('logout', function(name) {
      socket.broadcast.emit('logout', name);
      activeUsers.splice(activeUsers.indexOf(name), 1);
      if (name.substr(0, 5) === 'guest') {
        guestList.splice(guestList.indexOf(parseInt(name.substr(5))), 1);
      }
    });

    socket.on('disconnect', function() {
      if (socket.name) {
        socket.broadcast.emit('logout', socket.name);
        activeUsers.splice(activeUsers.indexOf(socket.name), 1);
        if (socket.name.substr(0, 5) === 'guest') {
          guestList.splice(guestList.indexOf(parseInt(socket.name.substr(5))), 1);
        }
      }
    });

    socket.on('message', function(msg) {
      socket.broadcast.emit('message', msg);
      messages.push(msg);
    });
  });
};
