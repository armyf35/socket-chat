angular.module('socket-chat', [
  'socket-chat.chat',
  'ngRoute'
])
.config(function ($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'app/chat/chat.html',
      controller: 'ChatController'
    })
    .otherwise({
      redirectTo: '/home'
    });
});
