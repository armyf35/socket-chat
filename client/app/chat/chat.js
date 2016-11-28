angular.module('socket-chat.chat', [])

.controller('ChatController', function ($scope) {
  
.controller('ChatController', function ($scope, Socket) {
  $scope.promptName = function() {
    $scope.name = prompt('What is your name?') || 'anonymous';
  };
});
