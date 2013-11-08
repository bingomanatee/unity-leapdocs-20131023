var path = require('path');
var _ = require('underscore');
var fs = require('fs');
var async = require('async');
var marked = require('marked');
var util = require('util');

var DOCROOT = path.resolve(__dirname, './../../actions/guide/static/documentation');
console.log("DOCROOT: %s", DOCROOT);
var toc = require(path.resolve(DOCROOT, 'content.json'));

var _MPT = _.template('<%= root %>/<%= language %>/<%= item %>/<%= file %>');

var manifest_path = function(params){
    params.root = DOCROOT;
    return _MPT(params);
}

var language_content = {};
module.exports = function (apiary, callback) {

    var model = {
        name: 'guide',

        toc_item: function (name, language, cb) {

            if (!language_content[language]) {
                try {
                    language_content[language] = require(path.resolve(DOCROOT, language, 'content.json'));
                } catch (err) {
                    return cb(err);
                }
            }

            var toc = language_content[language].toc;

            var item = _.find(toc, function (item) {
                return item.name == name;
            }) || {error: 'cannot find ' + name};

            cb(null, item);
        },

        /**
         * populate the manifest with referenced information.
         *
         * right now only works for markdown files. Will put html version of the markdown into the manifest.
         * @param section
         * @param item_name
         * @param language
         */
        get_section_manifest: function (callback, section, item_name, language) {
            console.log('gsm section: %s', util.inspect(section));
            var q = async.queue(function (manifest_element, done) {
                var item_type = 'markdown';
                var value = '';
                if (_.isString(manifest_element.value)) {
                    value = manifest_element.value;
                } else {
                   item_type = manifest_element.value.type;
                    if (manifest_element.value.item_name){
                        item_name = manifest_element.value.item_name;
                    }
                    if (manifest_element.value.language){
                        language = manifest_element.value.language;
                    }

                   value = manifest_element.value.value;
                }

                switch (item_type){
                    case 'markdown':
                        var params = {
                            file: value,
                            item: item_name,
                            language: language
                        };

                        console.log('params: %s', util.inspect(params));

                        var mpath = manifest_path(params);

                        console.log('getting %s', mpath);
                        fs.readFile(mpath, {encoding: 'utf8'}, function(err, content){
                            if (err){
                                console.log('error: %s', err);
                                return done();
                            }
                            console.log('assigning %s to index %s ', content, manifest_element.index);
                            section.manifest[manifest_element.index] = marked(content);
                            done();
                        })
                        break;

                    default:

                        console.log('unknown type %s', item_type);
                }

            });

            q.drain = callback;

            var items = section.manifest.map(function (value, index) {
                return {index: index, value: value}
            });

            console.log('mi: %s', util.inspect(items));
            q.push(items);
        },

        section: function (name, item, language, cb) {
            var n = name;
            if (!/.json$/.test(n)) {
                n += '.json';
            }
            var item_path = path.resolve(DOCROOT, language, item, n);
            fs.exists(item_path, function (e) {
                if (!e) {
                    cb(new Error('cannot find path ' + item_path));
                } else {
                    try {
                        cb(null, require(item_path));
                    } catch (err) {
                        cb(err);
                    }
                }
            })
        }
    };

    callback(null, model);

}