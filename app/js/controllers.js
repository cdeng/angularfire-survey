"use strict";

/* Controllers */

var app = angular.module("myApp.controllers", ["ngRoute", "firebase"]);

// survey page controller
app.controller("surveyCtrl", ["$scope", "$rootScope", "FBURL", "$firebaseArray",
    function($scope, $rootScope, FBURL, $firebaseArray) {
        
        var ref = new Firebase(FBURL);
        // create a synchronized array
        $scope.surveys = $firebaseArray(ref);

        // default placeholders
        $scope.age = "16-25";
        $scope.name = "";
        $scope.dinner = "Yes";
        $scope.rating = 5;
        $scope.comment = "";

        // hide success information/alert
        $scope.successInfo = false;

        // star rating question - update rating score
        $scope.updateRating = function(rating) {
            $scope.rating = rating;
        };

        // open modal
        $scope.takeSurvey = function () {
            $("#survey").modal("show");
        };

        // add the array into $scope
        $rootScope.results = $firebaseArray(ref);

        // add new items to the array
        // and add it to Firebase
        $scope.addSurvey = function() {
            if( $scope.age && $scope.name && $scope.dinner && $scope.rating ) {
                $scope.surveys.$add({
                    age: $scope.age,
                    name: $scope.name,
                    dinner: $scope.dinner,
                    rating: $scope.rating,
                    comment: $scope.comment
                });
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
        
        $scope.login = function() {
            
            $scope.authData = null;
            $scope.error = null;
            
            // Temporary email and password placeholder
            $scope.email = "cdeng@wpi.edu";
            $scope.pass = "testaccount";
            
            // Authentication using an email / password combination
            $scope.authObj.$authWithPassword({
                email: $scope.email,
                password: $scope.pass
            }).then(function(authData) {
                $scope.authData = authData;
                console.log("Logged in as:", authData.uid);
                $location.path("/result");
            }).catch(function(error) {
                $scope.error = error;
                console.error("Authentication failed:", error);
            });
        };

    }
]);

// result page controller
app.controller("resultCtrl", ["$scope", "$rootScope", "FBURL", "$firebaseAuth", "$location",
    function($scope, $rootScope, FBURL, $firebaseAuth, $location) {
        
        var ref = new Firebase(FBURL);
        $scope.authObj = $firebaseAuth(ref);

//        angularFire(FBURL+"/users/"+$scope.auth.id, $scope, "user", {});

        $rootScope.logout = function() {
            $scope.authObj.$unauth();
            $location.path("/survey");
        };

    }
]);