angular.module('socket-chat.auth', [])
.controller('AuthController', ['$scope', '$window', '$location', 'Auth', 'Socket', function($scope, $window, $location, Auth, Socket) {
  if ($location.$$path === '/logout') {
    Socket.logout(Auth.user.username);
    Auth.signout();
  }

  $scope.user = Auth.user;
  for (var prop in $scope.user) { if ($scope.user.hasOwnProperty(prop)) { delete $scope.user[prop]; } }

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        Socket.login($scope.user.username);
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
        Socket.login($scope.user.username);
        $window.localStorage.setItem('com.socket-chat', token);
        $location.path('/chats');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
}]);
