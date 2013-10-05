'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

    .controller('surveyCtrl', ['$scope', '$rootScope', 'FBURL', 'Firebase', 'angularFireCollection', function($scope, $rootScope, FBURL, Firebase, angularFireCollection) {
        $scope.newAge = '16-25';
        $scope.newName = '';
        $scope.newDinner = 'Yes';

        // open modal
        $scope.takeSurvey = function () {
            $('#survey').modal('show');
        };

        // constrain number of messages by passing a ref to angularFire
        var age = new Firebase(FBURL+'/survey').limit(10),
            name = new Firebase(FBURL+'/survey').limit(30),
            dinner = new Firebase(FBURL+'/survey').limit(5);

        // add the array into $scope
        $rootScope.results = angularFireCollection(age, name, dinner);

        // add new results to the list
        $scope.addSurvey = function() {
            if( $scope.newAge && $scope.newName && $scope.newDinner ) {
                $rootScope.results.add({age: $scope.newAge, name: $scope.newName, dinner: $scope.newDinner});
                $scope.newAge = '16-25';
                $scope.newName = '';
                $scope.newDinner = 'Yes';
                $('#survey').modal('hide');
            } else {
                alert('You missed something.');
            }
        };
    }])

    .controller('loginCtrl', ['$scope', 'loginService', '$location', function($scope, loginService, $location) {
        $scope.email = 'cdeng@wpi.edu';
        $scope.pass = 'testaccount';

        $scope.login = function(callback) {
        $scope.err = null;
        loginService.login($scope.email, $scope.pass, '/login', function(err, user) {
            $scope.err = err||null;
            typeof(callback) === 'function' && callback(err, user);
            if (!$scope.err) {
                $location.path('/result')
            }
            });
        };

    }])

    .controller('resultCtrl', ['$scope', '$rootScope', 'loginService', 'angularFire', 'FBURL', '$timeout', function($scope, $rootScope, loginService, angularFire, FBURL, $timeout) {

      angularFire(FBURL+'/users/'+$scope.auth.id, $scope, 'user', {});

      $rootScope.logout = function() {
         loginService.logout('/survey');
      };

    }]);