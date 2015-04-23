var app = angular.module('coopEval', ['ngRoute']);

// configure routes
app.config(function($routeProvider, $locationProvider) {
  $routeProvider

    .when('/', {
      templateUrl: 'register.html',
      controller: 'registrationController'
    })

    .when('/signedUp', {
        templateUrl: 'signed_up.html',
        controller: 'signedUpController'
    });

});

app.controller('navController', function($location, $scope) {
    $scope.showLogin = function() {
        return '/' === $location.path();
    };
});

app.controller('registrationController', function($http, $location, $scope) {
    $scope.signUp = function() {
        var postObj = {
            username: $scope.username,
            email: $scope.email,
            password: CryptoJS.MD5($scope.password).toString(CryptoJS.enc.Hex)
        };

        console.log(postObj);

        $http({
              url: '/register',
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              data: JSON.stringify(postObj)
            }).
            success(function(data) {
              $location.path('/signedUp');
            }).
            error(function() {}
        );
    };
});

app.controller('signedUpController', function() {

});