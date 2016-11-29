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
      templateUrl: 'app/chat/chat.html',
      controller: 'ChatController'
    })
    .when('/login', {
      templateUrl: 'app/chat/chat.html',
      controller: 'ChatController'
    })
    .otherwise({
      redirectTo: '/chat'
    });
});
