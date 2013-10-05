(function() {
   'use strict';

   /* Services */

   angular.module('myApp.services', [])

      .factory('loginService', ['angularFireAuth', 'profileCreator', '$location', '$rootScope',
         function(angularFireAuth, profileCreator, $location, $rootScope) {
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
         }])

      .factory('profileCreator', ['Firebase', 'FBURL', '$rootScope', function(Firebase, FBURL, $rootScope) {
         return function(id, email, callback) {
            new Firebase(FBURL).child('users/'+id).set({email: email, name: firstPartOfEmail(email)}, function(err) {
               //err && console.error(err);
               if( callback ) {
                  callback(err);
                  $rootScope.$apply();
               }
            });

            function firstPartOfEmail(email) {
               return ucfirst(email.substr(0, email.indexOf('@'))||'');
            }

            function ucfirst (str) {
               // http://kevin.vanzonneveld.net
               // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
               // +   bugfixed by: Onno Marsman
               // +   improved by: Brett Zamir (http://brett-zamir.me)
               // *     example 1: ucfirst('kevin van zonneveld');
               // *     returns 1: 'Kevin van zonneveld'
               str += '';
               var f = str.charAt(0).toUpperCase();
               return f + str.substr(1);
            }
         }
      }]);

   function errMsg(err) {
      return err? '['+err.code+'] ' + err.toString() : null;
   }
})();

