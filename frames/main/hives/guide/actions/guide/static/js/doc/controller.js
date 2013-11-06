(function () {
    var app = angular.module('leapDocApp');

    app.controller('documentation', function ($scope, docData, $window) {

        docData($scope);

        $scope.foo = 'bar';
        $scope.section = '';

        $window.GoSection = function (section) {
            $scope.$apply(function () {
                $scope.section = section;

            })
        }

        $scope.$watch('section', function(section){
            window.location.hash = '#';
            setTimeout(function(){
                window.location.hash = '#' + section;
            }, 200)
        })

        $scope.show_section = function (s) {
            console.log("checking section", s.name);

            if (s.name == 'developer_guide') {
                return true;
            } else if ($scope.section) {
                return (s.name.toLowerCase().replace(/^leap\./, '') == $scope.section.toLowerCase());
            } else {
                return s.name.toLowerCase() == 'overview';
            }
        }


        console.log('dl: ', $window.location.hash);
        if (window.location.hash){
            var h = $window.location.hash;
            // temporarily toggle out the hash to enforce location after document render
            $window.location.hash = '#';
            setTimeout(function(){
               window.location.hash = h;
            }, 500);
        }
    });

})();