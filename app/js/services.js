"use strict";

/**
 * Services module which defines app version and FBURL.
 * @module myApp/services
 */
var app = angular.module("myApp.services", ["firebase"]);

// define app version
app.value("version", "1.1.0");

// re-usable factory that generates the $firebaseAuth instance
app.factory("Auth", function($firebaseAuth) {
    return $firebaseAuth();
  }
);