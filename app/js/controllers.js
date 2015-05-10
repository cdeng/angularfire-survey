"use strict";

/* Controllers */

var app = angular.module("myApp.controllers", ["ngRoute", "firebase"]);

// survey page controller
app.controller("surveyCtrl", ["$scope", "$rootScope", "FBURL", "$firebaseArray",
    function($scope, $rootScope, FBURL, $firebaseArray) {
        
        var ref = new Firebase(FBURL);
        // create a synchronized array
        $scope.surveys = $firebaseArray(ref);

        // hide success information/alert
        $scope.successInfo = false;

        // open modal
        $scope.takeSurvey = function () {
            $("#survey").modal("show");
        };
        
        // timestamp
        $scope.timestamp = new Date().getTime();

        // store data in this object
        // set default values
        $scope.formData = {
            "name": "Your Name",
            "age": "30-",
            "colors": {
                "red": false,
                "blue": true,
                "green": false
            },
            "lunch": true,
            "rating": 5,
            "comment": "Thank you.",
            "timestamp": $scope.timestamp
        };
        
        // star rating question - update rating score
        $scope.updateRating = function(rating) {
            $scope.formData.rating = rating;
        };

        // add new items to the array
        // and add it to Firebase
        $scope.addSurvey = function() {
            if($scope.formData) {
                $scope.surveys.$add($scope.formData);
                $("#survey").modal("hide");
                $scope.successInfo = true;
            } else {
                alert("You missed something.");
            }
        };

    }
]);

// login page controller
app.controller("loginCtrl", ["$scope", "$location", "FBURL", "$firebaseAuth",
    function($scope, $location, FBURL, $firebaseAuth) {
            
        var ref = new Firebase(FBURL);
        $scope.authObj = $firebaseAuth(ref);
        
        // Temporary email and password placeholder
        $scope.email = "admin@mydomain.com";
        $scope.password = "password";
        
        $scope.login = function() {
            
            $scope.authData = null;
            $scope.error = null;            
            
            // Authentication using an email / password combination
            $scope.authObj.$authWithPassword({
                email: $scope.email,
                password: $scope.password
            }).then(function(authData) {
                $scope.authData = authData;
                $location.path("/result");
            }).catch(function(error) {
                $scope.error = error;
            });
        };

    }
]);

// result page controller
app.controller("resultCtrl", ["$scope", "FBURL", "$firebaseArray",
    function($scope, FBURL, $firebaseArray) {        
        var ref = new Firebase(FBURL);
        $scope.results = $firebaseArray(ref);
    }
]);