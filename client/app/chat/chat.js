angular.module('socket-chat.chat', [
  'socket-chat.services',
  'angularMoment'
])

.controller('ChatController', ['$scope', 'Socket', 'Message', 'Users', 'Auth', 'moment', function ($scope, Socket, Message, Users, Auth, moment) {
  $scope.users = [];
  $scope.message = '';
  $scope.messages = [];
  $scope.messageDisplayAmount = 20;
  $scope.isAuth = Auth.isAuth;

  $scope.loadCurrent = function() {
    Users.getActiveUsers()
      .then(function(users) {
        $scope.users = users;
      });

    Message.getRecent()
      .then(function(messages) {
        $scope.messages = messages;
      });
  };

  $scope.sendMessage = function() {
    let message = {
      username: Auth.user.username,
      text: $scope.message
    };

    Message.sendMessage(message);
    $scope.message = '';
  };

  $scope.addMessage = function(msg) {
    $scope.messages.unshift(msg);

    while ($scope.messages.length > $scope.messageDisplayAmount) {
      $scope.messages.pop();
    }
  };

  Socket.on('login', function(name) {
    $scope.users.push(name);
  });

  Socket.on('logout', function(name) {
    $scope.users.splice($scope.users.indexOf(name), 1);
  });

  Socket.on('reconnect', function() {
    $scope.loadCurrent();
    if (Auth.isAuth()) {
      Socket.login(Auth.user.username);
    }
  });

  Socket.on('message', function(msg) {
    $scope.addMessage(msg);
  });
}]);
