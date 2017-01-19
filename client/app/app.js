angular.module('socket-chat', [
  'socket-chat.chat',
  'socket-chat.auth',
  'ngRoute'
])
.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/chat', {
      templateUrl: 'app/chat/chat.html',
      controller: 'ChatController'
    })
    .when('/register', {
      templateUrl: 'app/auth/register.html',
      controller: 'AuthController'
    })
    .when('/login', {
      templateUrl: 'app/auth/login.html',
      controller: 'AuthController'
    })
    .when('/logout', {
      templateUrl: 'app/auth/login.html',
      controller: 'AuthController'
    })
    .otherwise({
      redirectTo: '/chat'
    });

  $httpProvider.interceptors.push('AttachTokens');
}])
.controller('NavbarController', ['$scope', '$location', 'Auth', function ($scope, $location, Auth) {
  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };
  $scope.isAuth = Auth.isAuth;
  $scope.user = Auth.user;
}])
.factory('AttachTokens', ['$window', function ($window) {
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.socket-chat');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
}]);
