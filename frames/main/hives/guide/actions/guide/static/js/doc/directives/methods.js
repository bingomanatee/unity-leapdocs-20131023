(function () {

    var app = angular.module('leapDocApp');

    app.directive('methods', function InjectingFunction() {

        return {
            templateUrl: '/js/guide/doc/directives/methods.html',
            scope: {methods: '=methodlist', section_item: '=sectionitem'},
            controller: function ($scope) {

                $scope.no_methods = function () {
                    if (!$scope.methods) return false;
                    return ($scope.methods.length < 1);
                }
            },
            compile: function CompilingFunction($templateElement, $templateAttributes) {

                return function LinkingFunction($scope, $linkElement, $linkAttributes) {
                };
            }
        };
    });

})(window);