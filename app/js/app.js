"use strict";

/**
 * App level module which depends on filters, services and so on.
 * @module myApp
 */
var app = angular.module("myApp", [
    "firebase", "myApp.config", "myApp.filters", "myApp.services",
    "myApp.directives", "myApp.controllers"
]);

// configure views
app.config(["$routeProvider",
    function ($routeProvider) {

        $routeProvider.when("/survey", {
            templateUrl: "partials/survey.html",
            controller: "surveyCtrl"
        });

        $routeProvider.when("/login", {
            templateUrl: "partials/login.html",
            controller: "loginCtrl"
        });

        $routeProvider.when("/result", {
            templateUrl: "partials/result.html",
            controller: "resultCtrl",
            resolve: {
                // controller will not be loaded until $requireAuth resolves
                "currentAuth": ["Auth", function (Auth) {
                        // $requireAuth returns a promise so the resolve waits for it to complete
                        return Auth.$requireSignIn();
                    }]
            }
        });

        $routeProvider.otherwise({redirectTo: "/survey"});

    }
]);

// redirect the user back to the survey page if auth error is catched
app.run(["$rootScope", "$location", "Auth",
    function ($rootScope, $location, Auth) {

        // any time auth status updates, add auth data to rootScope
        Auth.$onAuthStateChanged(function (authData) {
            $rootScope.authData = authData;
        });

        $rootScope.logout = function () {
            Auth.$signOut();
            $location.path("/survey");
        };

        // show nav menu in highlight when it's active
        $rootScope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        $rootScope.$on("$routeChangeError", function (event, next, previous, error) {
            if (error === "AUTH_REQUIRED") {
                $location.path("/survey");
            }
        });
    }
]);