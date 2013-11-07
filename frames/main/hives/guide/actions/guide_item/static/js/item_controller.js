(function () {
    var app = angular.module('leapDocApp');

    app.controller('documentationItem', function ($scope, $window, SectionItem) {

        console.log('location: ', $window.location);

        var config = $window.location.pathname.split(/\//g);
        var language = config[2];
        var item = config[3];

        SectionItem.get(
            { language: language, item: item },
            function (toc_item) {
            console.log('toc_item: ', toc_item);
                $scope.toc_item = toc_item;

                _.each(toc_item.sections, function(section, i){
                    toc_item.sections[i] = SectionItem.getSection({language: language, item: item, section: section});
                });
            });

    });

})();