angular.module('secureApp.services', []).factory('AuthFactory', function($scope, $timeout) {

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

    var currentUser = null;

    var login = function (username, password) {

      var deferred = $q.defer();

      // We use timeout in order to simulate a roundtrip to a server,
      // which will be present in any realistic authentication scenario.
      $timeout(function () {

        // Clear any existing, cached user data before logging in
        currentUser = null;

        // See if we can find a matching username-password match
        validUsers.forEach(function (user) {
          if (user.username == username && user.password == password) {
            // If we have a match, cache it as the current user
            currentUser = user;
            deferred.resolve();
          }
        });

        // If no match could be found, reject the promise
        if (!currentUser) {
          deferred.reject();
        }

      }, 1000);

      // Return the promise to the caller
      return deferred.promise;
    };

    var isAuthenticated = function () {
      console.log("judge");
      return currentUser ? true : false;
    };

    var getCurrent = function () {
      return isAuthenticated() ? currentUser : null;
    };

    return {
      login: login,
      isAuthenticated: isAuthenticated,
      getCurrent: getCurrent
    }
  });
