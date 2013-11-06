bigblind = window.bigblind || angular.module("bigblind",[]);

bigblind.directive("repeatInside", function(){
    "use strict";
    var linkIt = function(scope, $element, index, key, val, keyIdentifier, valIdentifier, transclude){
        var childScope = scope.$new();
        childScope.index = index;
        if (keyIdentifier) {
            childScope[keyIdentifier] = key;
        }
        childScope[valIdentifier] = val;
        childScope.first = (index === 0);
        transclude(childScope,function(clone){
            clone.scope = childScope;
            $element.append(clone);
        });
    };
    var ddo = {
        transclude:true,
        compile: function(element, attrs, transclude){
            return function($scope, $element, $attr){
                var expression = $attr.repeatInside;
                var match = expression.match(/^\s*(.+)\s+in\s+(.*?)$/);
                var lhs, rhs;
                var keyIdentifier, valIdentifier, hashFnLocals = {};


                if(!match){
                    throw "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got " + expression;
                }

                lhs = match[1];
                rhs = match[2];

                match = lhs.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);
                if (!match) {
                    throw "bad left hand side in loop";
                }
                valIdentifier = match[3] || match[1];
                keyIdentifier = match[2];

                $scope.$watch(rhs, function(newval, oldval) {
                    var childScope, index = 0;
                    var children = angular.element($element[0]).children();

                    console.log("test output:");
                    console.log($element);
                    console.log($element.children());
                    console.log(angular.element($element[0]).children());

                    for (var i=0; i < children.length; i++){
                        children[i].remove();
                    }

                    if (angular.isArray(newval)){
                        for (index=0; index<newval.length; index++) {
                            linkIt($scope, $element, index, index, newval[index], keyIdentifier, valIdentifier, transclude);
                        }
                    }else{
                        for (var key in newval){
                            if (newval.hasOwnProperty(key) && key[0] !== "$") {
                                linkIt($scope, $element, index, key, newval[key], keyIdentifier, valIdentifier, transclude);
                                index += 1;
                            }
                        }
                    }
                }, true);
            };
        }
    };
    return ddo
})