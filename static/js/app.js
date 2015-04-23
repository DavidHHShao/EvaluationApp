var app = angular.module('coopEval', []);

app.controller('registrationController', function($http, $scope) {
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
              console.log('save success')
            }).
            error(function() {}
        );
    };
});