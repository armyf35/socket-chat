angular.module('socket-chat.chat', [
  'socket-chat.socketService'
])

.controller('ChatController', function ($scope, Socket) {
  $scope.users = [];
  $scope.message = '';
  $scope.messages = Message.getRecent();
  $scope.messageDisplayAmount = 20;

  $scope.promptName = function() {
    $scope.name = prompt('What is your name?') || 'anonymous';
    Socket.login($scope.name);
  };

  $scope.sendMessage = function() {
    let message = {
      user: $scope.name,
      text: $scope.message,
      createdAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    Socket.sendMessage(message);
    $scope.addMessage(message);
    $scope.message = '';
  };

  $scope.addMessage = function(msg) {
    $scope.messages.unshift(msg);

    if ($scope.messages.length > $scope.messageDisplayAmount) {
      $scope.messages.pop();
    }
  };

  Socket.on('login', function(name) {
    $scope.users.push(name);
  });

  Socket.on('logout', function(name) {
    $scope.users.splice($scope.users.indexOf(name), 1);
  });

  Socket.on('message', function(msg) {
    $scope.addMessage(msg);
  });
});
