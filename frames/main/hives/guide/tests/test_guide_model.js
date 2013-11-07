var tap = require('tap');
var util = require('util');

tap.test('model IO', {skip: false, timeout: 10 * 1000}, function(test){

   var guide_model = require('./../resources/models/guide_model');

    guide_model({}, function(err, model){

        model.toc_item('overview', 'javascript', function(err, item){
        //    console.log(util.inspect(item));

            test.deepEqual(item, { title: 'Overview',
                name: 'overview',
                sections: [ 'developer_guide', 'getting_data', 'units' ] }, 'retrieved overview')

            model.section('units', 'overview', 'javascript', function(err, section){
                console.log(util.inspect(section));
                test.deepEqual(section, { title: 'Units of measurement used in Leap API',
                    menu_title: 'Units',
                    manifest: [ 'units.md' ] }, 'retrieved section');
                test.end();
            })
        })

    });

});