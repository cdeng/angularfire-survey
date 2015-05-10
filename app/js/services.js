"use strict";

/* Services */

var app = angular.module("myApp.services", ["ngRoute"]);

// app version
app.value("version", "1.0");

app.factory("Auth", ["$firebaseAuth", "FBURL",
  function($firebaseAuth, FBURL) {
    var ref = new Firebase(FBURL);
    return $firebaseAuth(ref);
  }
]);