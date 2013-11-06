(function(){
    angular.module('leapDocApp', ['bigblind']).filter('md', function(){
        return function(input){
            if (!input) input = '';
            return marked(input);
            //return 'md --' + input + ' -- md';
        };
    })
})()