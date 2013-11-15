(function () {

    var app = angular.module('leapDocApp');

    app.directive('propExpression', function InjectingFunction($interpolate) {
        //@TODO: inject template root.

        function noLink(value){
           return !/^Leap\./.test(value);
        }

        return {
            scope: {value: '=value'},
            templateUrl: '/js/guide/doc/directives/propExpression.html',
            controller: function ($scope) {

                $scope.expression_type = function(){

                    if ($scope.value.array){
                        if (noLink($scope.value.type)){
                            return 'array';
                        } else {
                            return 'array linked'
                        }
                    } else {
                        if (noLink($scope.value.type)){
                            return '';
                        } else {
                            return 'linked'
                        }
                    }

                };

                $scope.link_target = function(){
                    return  $scope.value.type;
                }

                $scope.link = function(target){
                    console.log('going to ', target);
                    $scope.$emit('goto', target);
                }

                $scope.label = function(){
                    return $scope.value.type;
                }

                $scope.optional = function(){
                    return '';
                }
            },
            compile: function CompilingFunction($templateElement, $templateAttributes) {

                return function LinkingFunction($scope, $linkElement, $linkAttributes) {

                }
            }
        };
    });

})(window);