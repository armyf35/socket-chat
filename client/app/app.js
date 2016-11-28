angular.module('socket-chat', [
  'socket-chat.chat',
  'ngRoute'
])
.config(function ($routeProvider) {
  $routeProvider
    .when('/chat', {
      templateUrl: 'app/chat/chat.html',
      controller: 'ChatController'
    })
    .otherwise({
      redirectTo: '/chat'
    });
});
