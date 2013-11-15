(function (window, _) {

    var app = angular.module('leapDocApp');

    app.directive('argument', function InjectingFunction($interpolate) {
        //@TODO: inject template root.

        function noLink(value){
            return !/^Leap\./.test(value);
        }

        return {
            scope: {value: '=arg', comma: '=comma'},
            templateUrl:"/js/guide/doc/directives/argument.html",
            controller: function ($scope) {

                $scope.expression_type = function(){

                    if ($scope.value.type == $scope.label()){
                        if (noLink($scope.value.type)){
                            return 'anon';
                        } else {
                            return 'anon linked'
                        }
                    } else {
                        if (noLink($scope.value.type)){
                            return 'unlinked';
                        } else {
                            return 'linked'
                        }
                    }

                };

                $scope.link_target = function(){
                    return $scope.value.type;
                }

                $scope.link = function(target){
                   $scope.$emit('goto', target);
                }

                $scope.label = function(){
                    var cd = _.compact([$scope.value.title, $scope.value.name, $scope.value.type, 'param']);
                 //   console.log('candidates: ', cd);
                    return cd[0];
                }

                $scope.optional = function(){
                    return $scope.value.type.optional ? '?' : '';
                }
            },
            compile: function CompilingFunction($templateElement, $templateAttributes) {

                return function LinkingFunction($scope, $linkElement, $linkAttributes) {

                };
            }
        };
    });

})(window, _);