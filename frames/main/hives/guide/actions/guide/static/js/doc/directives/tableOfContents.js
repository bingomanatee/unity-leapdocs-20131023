(function () {

    var app = angular.module('leapDocApp');

    app.directive('tableOfContents', function InjectingFunction() {
        //@TODO: inject template root.
        return {
            templateUrl: '/js/guide/doc/directives/tableOfContents.html',
            controller: function ($scope, docData) {
                docData($scope);
            },
            compile: function CompilingFunction($templateElement, $templateAttributes) {

                return function LinkingFunction($scope, $linkElement, $linkAttributes) {
                    console.log('toc attrs: ', $linkAttributes);
                };
            }
        };
    })
    ;

})
    (window);