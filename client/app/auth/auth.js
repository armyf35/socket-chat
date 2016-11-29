angular.module('socket-chat.auth', [])
.controller('AuthController', function($scope, $window, $location, Auth, Socket) {
  if ($location.$$path === '/logout') {
    Auth.signout();
  }
  $scope.user = Auth.user;

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.socket-chat', token);
        $location.path('/chats');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.socket-chat', token);
        $location.path('/chats');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});
