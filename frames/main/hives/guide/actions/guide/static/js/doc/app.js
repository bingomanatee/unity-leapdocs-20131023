(function(){

    angular.module('guideModelService',['ngResource', 'ngSanitize']).factory('SectionItem', ['$resource',
        function ($resource) {
            return $resource('/guide/rest/:language/:item/:section', {language: '@language', item: '@item', section: '@section'}, {
                get: {method: 'GET', isArray: false},
                getSection: {method: 'GET', isArray: false}
            });
        }]);

    angular.module('leapDocApp', ['bigblind', 'guideModelService']).filter('md', function(){
        return function(input){
            if (!input) input = '';
            return marked(input);
            //return 'md --' + input + ' -- md';
        };
    })
})()