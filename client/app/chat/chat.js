angular.module('socket-chat.chat', [
  'socket-chat.socketService'
])

.controller('ChatController', function ($scope, Socket) {
  $scope.users = [];
  $scope.messages = [];
  $scope.messageDisplayAmount = 20;

  $scope.promptName = function() {
    $scope.name = prompt('What is your name?') || 'anonymous';
    Socket.login($scope.name);
  };

  Socket.on('login', function(name) {
    $scope.users.push(name);
  });

  Socket.on('logout', function(name) {
    $scope.users.splice($scope.users.indexOf(name), 1);
  });

  Socket.on('message', function(msg) {
    $scope.messages.unshift(msg);

    if ($scope.messages.length === $scope.messageDisplayAmount) {
      $scope.messages.pop();
    }
  });
});
