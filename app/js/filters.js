'use strict';

/**
 * Filters module which defines filters for application.
 * @module myApp/filteres
 */
var app = angular.module('myApp.filters', ['ngRoute'])

/**
 * Interpolate app version.
 * @param {String} version - App version defined in services.
 */
app.filter('interpolate', ['version', function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
   }
]);