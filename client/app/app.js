angular.module('socket-chat', [
  'ngRoute'
])
.config(function ($routeProvider) {
  $routeProvider
    .when('/home', {
    })
    .otherwise({
      redirectTo: '/home'
    });
});
