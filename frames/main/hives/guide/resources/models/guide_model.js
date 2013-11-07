var path = require('path');
var _ = require('underscore');
var fs = require('fs');

var DOCROOT = path.resolve(__dirname, './../../actions/guide/static/documentation');
console.log("DOCROOT: %s", DOCROOT);
var toc = require(path.resolve(DOCROOT, 'content.json'));


var language_content = {};
module.exports = function(apiary, callback){

    var model = {
        name: 'guide',

        toc_item: function(name, language, cb){

            if (!language_content[language]){
                try {
                    language_content[language] = require(path.resolve(DOCROOT, language, 'content.json'));
                } catch(err){
                    return cb(err);
                }
            }

            var toc = language_content[language].toc;

            var item =  _.find(toc, function(item){
                return item.name == name;
            }) || {error: 'cannot find ' + name};

            cb(null, item);
        },

        section: function(name, item, language, cb){
          var  n = name;
            if (!/.json$/.test(n)){
                n += '.json';
            }
            var item_path = path.resolve(DOCROOT, language, item, n);
            fs.exists(item_path, function(e){
                if (!e){
                    cb(new Error('cannot find path ' + item_path));
                } else {
                    try {
                        cb (null, require(item_path));
                    } catch(err){
                        cb(err);
                    }
                }
            })
        }
    };

   callback(null, model);

}