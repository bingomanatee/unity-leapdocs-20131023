(function () {
    angular.module('leapDocApp').factory('docData', function ($http) {

        var _section_url = _.template('/documentation/javascript/<%= item.name %>/<%= section%>.json')

        function process_item(item, $http) {

            _.each(item.sections, function (section, i) {
                item.sections[i] = {name: section,
                    title: section.replace(/_/g, ' '),
                    menu_title: section.replace(/_/g, ' ')};

                var url = _section_url({
                    item: item, section: section
                });

                $http({method: 'GET', url: url}).success(function (section_item) {
                    if (!section_item.name) {
                        section_item.name = section;
                    }

                    if (!section_item.title) {
                        section_item.title = section.replace(/_/g, '&nbsp;');
                    }

                    if (!section_item.menu_title) {
                        section_item.menu_title = section_item.title;
                    }

                  //  console.log('found section ', section_item, ':', url);
                    item.sections[i] = section_item;
                })
            });

            return item;
        }

        return function ($scope) {
            $http({method: 'GET', url: '/documentation/content.json'}).success(function (doc) {
                    console.log('content: ', doc);

                    doc.toc = _.map(doc.toc, function (item) {
                        return process_item(item, $http);
                    });

                    $scope.content = doc;
                }
            ).error(function (err) {
                    console.log('bad content call', err)
                });
        }

    })
})();