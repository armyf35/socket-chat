angular.module('socket-chat.chat', [
  'socket-chat.socketService'
])

.controller('ChatController', function ($scope, Socket) {
  $scope.promptName = function() {
    $scope.name = prompt('What is your name?') || 'anonymous';
    Socket.login($scope.name);
  };
});
