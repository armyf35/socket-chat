angular.module('socket-chat.services', [])
.factory('Socket', function($rootScope) {
  var connection = io.connect();

  var on = function (eventName, callback) {
    connection.on(eventName, function () {
      var args = arguments;
      $rootScope.$apply(function () {
        callback.apply(connection, args);
      });
    });
  };

  var login = function(name) {
    connection.emit('login', name);
  };

  var sendMessage = function(msg) {
    connection.emit('message', msg);
  };

  return {
    on: on,
    login: login,
    sendMessage: sendMessage
  };
})
.factory('Message', function($http) {
  var getActiveUsers = function() {

  };
  var getRecent = function() {

  };

  return {
    getActiveUsers: getActiveUsers,
    getRecent: getRecent
  };
});
