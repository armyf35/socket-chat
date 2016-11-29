angular.module('socket-chat', [
  'socket-chat.chat',
  'socket-chat.auth',
  'ngRoute'
])
.config(function ($routeProvider) {
  $routeProvider
    .when('/chat', {
      templateUrl: 'app/chat/chat.html',
      controller: 'ChatController'
    })
    .when('/register', {
      templateUrl: 'app/auth/auth.html',
      controller: 'AuthController'
    })
    .when('/login', {
      templateUrl: 'app/auth/auth.html',
      controller: 'AuthController'
    })
    .otherwise({
      redirectTo: '/chat'
    });
});
