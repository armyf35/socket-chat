angular.module('socket-chat.chat', [
  'socket-chat.socketService'
])

.controller('ChatController', function ($scope, Socket) {
  $scope.users = [];

  $scope.promptName = function() {
    $scope.name = prompt('What is your name?') || 'anonymous';
    Socket.login($scope.name);
  };

  Socket.on('login', function(name) {
    $scope.users.push(name);
  });
});
