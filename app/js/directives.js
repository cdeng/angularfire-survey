'use strict';

/* Directives */


angular.module('myApp.directives', []).
    // btnRadio directive from angular UI
    constant('buttonConfig', {
        activeClass: 'active',
        toggleEvent: 'click'
    }).
    directive('btnRadio', ['buttonConfig', function (buttonConfig) {
        var activeClass = buttonConfig.activeClass || 'active';
        var toggleEvent = buttonConfig.toggleEvent || 'click';

        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {

                //model -> UI
                ngModelCtrl.$render = function () {
                    element.toggleClass(activeClass, angular.equals(ngModelCtrl.$modelValue, scope.$eval(attrs.btnRadio)));
                };

                //ui->model
                element.bind(toggleEvent, function () {
                    if (!element.hasClass(activeClass)) {
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(scope.$eval(attrs.btnRadio));
                            ngModelCtrl.$render();
                        });
                    }
                });
            }
        };
    }]);
