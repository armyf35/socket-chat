angular.module('socket-chat.sockerService', [])
.factory('Socket', function() {
  var connected = false;

  var connect = function() {
    connected = io.connect();
  };

  var login = function(name) {
    if (!connected) {
      connect();
    }
    connected.emit('connected', name);
  };

  return {
    connect: connect,
    login: login
  };
});
