(function () {
    var app = angular.module('leapDocApp');

    app.controller('homePage', function ($scope, $window, SectionItem) {

        console.log('location: ', $window.location);

        $scope.show_me = function () {
            return !!$scope.toc_item;
        }

        $scope.$on('goto', function(event, target){
            if (/\//.test(target)){
                $scope.go_to(target);
            } else {
                $scope.section_name = target;
                $scope.go_to();
            }
        });

        $scope.go_to = $window.go_to = function (path) {

            if (path){
                var config = path.split(/\//g);
                $scope.language = config[2];
                $scope.item_name = config[3];
                $scope.section_name = config[4];
            }

            if ($scope.section_name) {
                var props = { language: $scope.language, item: $scope.item_name, section: $scope.section_name };
                console.log("getting ", props);
                SectionItem.get(
                    props,
                    function (section) {
                        console.log('section: ', section);
                        $scope.toc_item = {name: $scope.item_name, sections: [section]}
                    }
                );
            }
        }

        $scope.go_top = function(){

            $scope.toc_item = null;
            $window.SaySomethingToUnity('reset');
            $window.gone = false;
            return false;
        }
    });

})();