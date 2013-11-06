(function () {

    var app = angular.module('leapDocApp');

    app.directive('manifest', function InjectingFunction($http, docData) {

        function _make_table_of_contents($scope, params) {

        }

        function _set_output_data($scope, toc_item, manifest_item) {
            if (!/^\//.test(manifest_item)) {
                url = '/documentation/javascript/' + toc_item.name + '/' + manifest_item;
            } else {
                url = '/documentation' + manifest_item;

            }

            $http({method: 'GET', url: url}).success(function (data) {
                $scope.manifest_output = marked(data);
            }).error(function () {

                });
        }

        return {
            templateUrl: '/js/guide/doc/directives/manifest.html',
            controller: function ($scope) {

                $scope.manifest_toc_class = function(sections){
                    var count = Math.ceil(12 /sections.length);
                    return 'span' + count;
                    //@TODO: insulate against rounding
                };

                if ($scope.manifest_item) {
                    var manifest_item = $scope.manifest_item;

                    if (_.isString($scope.manifest_item)) {
                        $scope.manifest_item_type="markdown";

                        var toc_item = $scope.$parent.$parent.toc_item;
                        var section_item = $scope.$parent.section_item;

                        $scope.toc_item = toc_item;
                        $scope.section_item = section_item;

                        _set_output_data($scope, toc_item, manifest_item);
                    } else {
                        $scope.manifest_item_type = $scope.manifest_item.type;
                        switch ($scope.manifest_item_type){
                            case 'table_of_contents':

                                docData($scope);
                                break;
                        }
                    }
                } else {
                    console.log('no manifest_item in manifest');
                }


                $scope.manifest_output = '...';
            },
            compile: function CompilingFunction($templateElement, $templateAttributes) {

                return function LinkingFunction($scope, $linkElement, $linkAttributes) {

                };
            }
        };
    });

})(window);