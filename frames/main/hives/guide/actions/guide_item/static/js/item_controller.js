(function () {
    var app = angular.module('leapDocApp');

    app.controller('documentationItem', function ($scope, docData, $window) {

        docData($scope);

        $scope.foo = 'bar';
        $scope.section = '';

        $window.GoSection = function (section) {
            $scope.$apply(function () {
                $scope.section = section;

            })
        }

    });

})();