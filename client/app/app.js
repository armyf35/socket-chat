angular.module('socket-chat', [
  'socket-chat.chat',
  'ngRoute'
])
.config(function ($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'app/chat/home.html',
      controller: 'ChatController'
    })
    .otherwise({
      redirectTo: '/home'
    });
});
