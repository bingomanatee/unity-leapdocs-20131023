(function () {
    var app = angular.module('leapDocApp');

    app.controller('documentationItem', function ($scope, $window, SectionItem) {

        console.log('location: ', $window.location);

        var config = $window.location.pathname.split(/\//g);
        var language = config[2];
        var item_name = config[3];
        var section_name = config[4];

        if (section_name) {
            SectionItem.get(
                { language: language, item: item_name, section: section_name },
                function (section) {
                    console.log('section: ', section);
                    $scope.toc_item = {name: item_name, sections: [section]}
                }
            );
        } else {
            SectionItem.get(
                { language: language, item: item_name },
                function (toc_item) {
                    console.log('toc_item: ', toc_item);
                    $scope.toc_item = toc_item;

                    _.each(toc_item.sections, function (section, i) {
                        toc_item.sections[i] = SectionItem.getSection({language: language, item: item_name, section: section});
                    });
                });
        }
    });

})();