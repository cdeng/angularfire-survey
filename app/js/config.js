"use strict";

/**
 * Config module which defines Firebase URL.
 * @module myApp/config
 */
var app = angular.module("myApp.config", []);

// your Firebase URL goes here
var config = {
    apiKey: "AIzaSyAVCmE0CaAntEeB7p3Up9L990FGHnO11_E",
    authDomain: "angularfire-survey.firebaseapp.com",
    databaseURL: "https://angularfire-survey.firebaseio.com",
    storageBucket: "angularfire-survey.appspot.com",
    messagingSenderId: "204946184892"
};
firebase.initializeApp(config);

// double-check whether the app has been configured
if (config.authDomain === "angularfire-survey.firebaseapp.com") {
    angular.element(document.body).html("<h1>Please configure app/js/config.js before running!</h1>");
}