"use strict";

/**
 * Services module which defines app version and FBURL.
 * @module myApp/services
 */
var app = angular.module("myApp.services", ["ngRoute", "firebase"]);

// define app version
app.value("version", "1.0.1");

// re-usable factory that generates the $firebaseAuth instance
app.factory("Auth", ["$firebaseAuth", "FBURL",
  function($firebaseAuth, FBURL) {
      
    var ref = new Firebase(FBURL);
    return $firebaseAuth(ref);
    
  }
]);