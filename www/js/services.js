angular.module('secureApp.services', ['ionic', 'secureApp.services'])
.factory('AuthFactory', function($scope, $timeout) {
  var validUsers = [
    {
      firstName: 'Johanna',
      lastName: 'Doe',
      username: 'johnny',
      password: 'dolphin'
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
      username: 'zo1337',
      password: 'monkey'
    },
    {
      firstName: 'Mary',
      lastName: 'Doe',
      username: 'bl00dy',
      password: 'fish'
    }
  ];

  var currentUser = null; // 当前用户
  var login = function (username, password) {
    var deferred = $q.defer(); // promise library
    // We use timeout in order to simulate a roundtrip to a server,
    // which will be present in any realistic authenitcation scenario.
    $timeout(function(){
      // Clear any existin, cached user data before logging in
      currentUser = null; // 正在登录的user g
      // See if we can find amatching username-password match
      validUsers.forEach(function(user){
        // 遍历所有的用户数据来比对
        if (user.username === username && user.password === password){
          // If we have a match, cache it as the current user
          currentUser = user;
          deferred.resolve();
        }
      });
      // If no match could be found, reject the promise
      if (!currentUser){
        deferred.reject(); // reject the promise means failture in these logic
      }
    }, 1000);
    // Retrurn the promise to the caller
    return deferred.promise; // return the promise status
  };

  // login status judgement
  var isAuthenticated = function () {
    return currentUser ? true : false;
  };

  // current login status
  var getCurrent = function () {
    return isAUthenticated() ? currentUser : null;
  };

  // expose to the global environment
  return {
    login: login,
    isAuthenticated: isAuthenticated,
    getCurrent: getCurrent
  }
});

