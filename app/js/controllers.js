'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngRoute'])

    // survey page controller
    .controller('surveyCtrl', ['$scope', '$rootScope', 'FBURL', 'Firebase', 'angularFireCollection', function($scope, $rootScope, FBURL, Firebase, angularFireCollection) {

        // default placeholders
        $scope.age = '16-25';
        $scope.name = '';
        $scope.dinner = 'Yes';
        $scope.rating = 5;
        $scope.comment = '';

        // hide success information/alert
        $scope.successInfo = false;

        // star rating question - update rating score
        $scope.updateRating = function(rating) {
            $scope.rating = rating;
        };

        // open modal
        $scope.takeSurvey = function () {
            $('#survey').modal('show');
        };

        // constrain number of messages by passing a ref to angularFire
        var age = new Firebase(FBURL+'/survey').limit(10),
            name = new Firebase(FBURL+'/survey').limit(30),
            dinner = new Firebase(FBURL+'/survey').limit(5),
            rating = new Firebase(FBURL+'/survey').limit(2),
            comment = new Firebase(FBURL+'/survey').limit(500);

        // add the array into $scope
        $rootScope.results = angularFireCollection(age, name, dinner, rating, comment);

        // add new results to the list
        $scope.addSurvey = function() {
            if( $scope.age && $scope.name && $scope.dinner && $scope.rating ) {
                $rootScope.results.add({age: $scope.age, name: $scope.name, dinner: $scope.dinner, rating: $scope.rating, comment: $scope.comment});
                $('#survey').modal('hide');
                $scope.successInfo = true;
            } else {
                alert('You missed something.');
            }
        };

    }])

    // login page controller
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

    // result page controller
    .controller('resultCtrl', ['$scope', '$rootScope', 'loginService', 'angularFire', 'FBURL', '$timeout', function($scope, $rootScope, loginService, angularFire, FBURL, $timeout) {

      angularFire(FBURL+'/users/'+$scope.auth.id, $scope, 'user', {});

      $rootScope.logout = function() {
         loginService.logout('/survey');
      };

    }]);