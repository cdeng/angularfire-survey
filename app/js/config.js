"use strict";

// Declare app level module which depends on filters, and services
angular.module("myApp.config", ["ngRoute"])

   // your Firebase URL goes here
   .constant("FBURL", "https://angularfire-survey.firebaseio.com/surveys");
