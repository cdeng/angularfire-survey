
# Survey App based on AngularFire

* An open source online survey tool.
* Based on AngularFire, AngularJS, Bootstrap and Firebase.
* Easy to set up without worrying about server code.
* To see what has changed in recent versions of AngularFire-Survey, see the [CHANGELOG](https://github.com/cdeng/angularFire-survey/blob/master/CHANGELOG.md).

## Demo

* https://angularfire-survey.firebaseapp.com/

## Dependencies

* [AngularFire 2.0.2](https://github.com/firebase/angularfire)
* [Google AngularJS 1.5.8](https://angularjs.org/)
* [Google Firebase 3.4.0](https://firebase.google.com)
* [Bootstrap 3.3.7](http://getbootstrap.com/)
* [JQuery 3.1.0](https://jquery.com/)

## Configuration

* Please configure Firebase URL in app/js/config.js before running.

```javascript
// your Firebase URL goes here
var config = {
    apiKey: "AIzaSyAVCmE0CaAntEeB7p3Up9L990FGHnO11_E",
    authDomain: "angularfire-survey.firebaseapp.com",
    databaseURL: "https://angularfire-survey.firebaseio.com",
    storageBucket: "angularfire-survey.appspot.com",
    messagingSenderId: "204946184892"
};
```

* Set up Email/Password authentication in Firebase.

    - Log in to [Firebase console](https://firebase.google.com/console/),  open the **Auth** section
    - On the **Sign in method** tab, enable the **Email/password** sign-in method and click **Save**.
    - Add email and password to **Users** tab

* Replace line 80 & 81 in app/js/controller.js with your own credentials you just set up.

```javascript
$scope.email = "admin@mydomain.com";
$scope.password = "password";
```

## Contributing

1. Fork it ( https://github.com/cdeng/angularFire-survey/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## License

Code released under [the MIT license](https://github.com/twbs/bootstrap/blob/master/LICENSE).
