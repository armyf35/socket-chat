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
  var getRecent = function() {
    return $http.get('/api/messages/recent')
      .then(function(res) {
        return res.data;
      });
  };

  return {
    getRecent: getRecent
  };
})
.factory('Users', function($http) {
  var getActiveUsers = function() {
    return $http.get('/api/users/active')
      .then(function(res) {
        return res.data;
      });
  };

  var getGuestNum = function() {
    return $http.get('/api/users/guest')
      .then(function(res) {
        return res.data;
      });
  };

  return {
    getActiveUsers: getActiveUsers,
    getGuestNum: getGuestNum
  };
});
