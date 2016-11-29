angular.module('socket-chat.services', [])
.factory('Socket', function($rootScope) {
  if (!$rootScope.connection) {
    $rootScope.connection = io.connect();
  }
  connection = $rootScope.connection;

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

  var logout = function(name) {
    connection.emit('logout', name);
  };

  return {
    on: on,
    login: login,
    logout: logout
  };
})
.factory('Message', function($http) {
  var getRecent = function() {
    return $http.get('/api/messages/')
      .then(function(res) {
        return res.data.slice(0, 20);
      });
  };

  var sendMessage = function(msg) {
    return $http({
      method: 'POST',
      url: '/api/messages/new',
      data: msg
    });
  };

  return {
    getRecent: getRecent,
    sendMessage: sendMessage
  };
})
.factory('Users', function($http) {
  var getActiveUsers = function() {
    return $http.get('/api/users/active')
      .then(function(res) {
        return res.data;
      });
  };

  return {
    getActiveUsers: getActiveUsers
  };
})
.factory('Auth', function($http, $window, $location, Socket) {
  user = {};

  var signin = function () {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function () {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.socket-chat');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.socket-chat');
    $location.path('/chat');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout,
    user: user
  };
});
