'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp.config', [])

   // your Firebase URL goes here
   .constant('FBURL', 'https://ux-survey.firebaseio.com');


/*********************
 * !!FOR E2E TESTING!!
 *
 * Must enable email/password logins and manually create
 * the test user before the e2e tests will pass
 *
 * user: test@test.com
 * pass: test123
 */
