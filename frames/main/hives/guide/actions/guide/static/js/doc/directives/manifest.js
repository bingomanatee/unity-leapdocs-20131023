(function () {

    var app = angular.module('leapDocApp');

    app.directive('manifest', function InjectingFunction($http, docData, $location) {

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

                $scope.go_toc_item = function(name, section){
                    $location.path(name + '/' + section);
                    console.log('going to ', name, section);
                }

                $scope.manifest_toc_class = function (sections) {
                    var count = Math.ceil(12 / sections.length);
                    return 'span' + count;
                    //@TODO: insulate against rounding
                };

                console.log('manifest: ', $scope.manifest, $scope.manifest_item, $scope.manifest_item_type);
                if ((!$scope.manifest_item) && $scope.manifest) {
                    $scope.manifest_item = $scope.manifest;
                }

                if ($scope.manifest_item) {
                    var manifest_item = $scope.manifest_item;

                    if (_.isString($scope.manifest_item)) {
                        $scope.manifest_item_type = "markdown";
                        $scope.manifest_output = $scope.manifest_item;
                    } else {
                        console.log('doing a typed manifest');
                        $scope.manifest_item_type = $scope.manifest_item.type;
                        switch ($scope.manifest_item_type) {
                            case 'toc':
                            case 'table_of_contents':
                                $scope.manifest_output  = $scope.manifest_item.value.toc;
                                break;

                            case 'image':
                                $scope.manifest_output = $scope.manifest_item.src;
                                break;
                        }
                    }
                } else {
                    console.log('no manifest_item in manifest');
                }


            },
            compile: function CompilingFunction($templateElement, $templateAttributes) {

                return function LinkingFunction($scope, $linkElement, $linkAttributes) {

                };
            }
        };
    });

})(window);