(function() {
   'use strict';

   /* Services */

   angular.module('myApp.services', ['ngRoute'])

      // app version
      .value('version', '0.3')

      .factory('loginService', ['angularFireAuth', '$location', '$rootScope',
         function(angularFireAuth, $location, $rootScope) {
            return {
               /**
                * @param {string} email
                * @param {string} pass
                * @param {string} [redirect]
                * @param {Function} [callback]
                * @returns {*}
                */
               login: function(email, pass, redirect, callback) {
                  var p = angularFireAuth.login('password', {
                     email: email,
                     password: pass,
                     rememberMe: true
                  });

                  p.then(function(user) {
                     if( redirect ) {
                        $location.path(redirect);
                     }
                     callback && callback(null, user);
                  }, callback);
               },

               /**
                * @param {string} [redirectPath]
                */
               logout: function(redirectPath) {
                  angularFireAuth.logout();
                  if( redirectPath ) {
                     $location.path(redirectPath);
                  }
               }
            }

      }]);

   function errMsg(err) {
      return err? '['+err.code+'] ' + err.toString() : null;
   }
})();

