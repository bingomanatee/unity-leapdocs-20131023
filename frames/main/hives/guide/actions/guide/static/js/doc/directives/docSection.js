(function () {

    var app = angular.module('leapDocApp');

    app.directive('docSection', function InjectingFunction($sce) {
        //@TODO: inject template root.
        return {
            templateUrl: '/js/guide/doc/directives/docSection.html',
            controller: function($scope){
                $scope.section_name_to_ID = function(s){
                    return s.replace( /\W/g, '_');
                }
            },
            compile: function CompilingFunction($templateElement, $templateAttributes) {

                return function LinkingFunction($scope, $linkElement, $linkAttributes) {
                };
            }
        };
    })
    ;

}) (window);