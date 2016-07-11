angular.module('secureApp.controllers', ['secureApp.services'])
.controller('AppCtrl', function($scope, $ionicModal, $timeout, AuthFactory) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html',{
    scope: $scope
  }).then(function(modal){
    $scope.modal = modal; // pass the modal to the scope
  });
  // Triggered in the login modal to close it
  $scope.closeLogin = function(){
    $scope.modal.hide();  // hide the modal
  };
  // Open the login modal
  $scope.login = function(){
    $scope.modal.show();  // show the modal
  };
  // Perform the login action when the user submits the login from
  $scope.doLogin = function(){
    AuthFactory.login($scope.loginData.username,
    $scope.loginData.password)
      .then(function(){ // sync the modal
                        // cope the callback logic
        $scope.closeLogin();
      })
  }
})

// what's the Chats mean?
  // where pass the parameter into the funciton
.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh;3 data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
