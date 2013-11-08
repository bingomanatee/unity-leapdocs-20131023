module.exports = {

    on_validate: function (context, done) {
        if (!context.language) {
            done(new Error('language required'));
        } else if (!context.item) {
            done(new Error('item required'));
        } else {
            done();
        }
    },

    on_input: function (context, done) {
        var model = this.model('guide')
        if (context.section) {
            model.section(context.section, context.item, context.language, function (err, s) {
                if (err) {
                    done(err);
                } else {
                    context.$out.set('section', s);
                    done();
                }
            });
        } else {
            model.toc_item(context.item, context.language, function (err, item) {
                if (err) {
                    done(err);
                } else {
                    context.$out.set('item', item);
                    done();
                }
            });
        }

    },

    on_process: function (context, done) {
        if (context.$out.has('section')) {

            var model = this.model('guide');
            var section = context.$out.get('section');
            model.get_section_manifest(done, section, context.item, context.language);
        } else {
            context.$send(done);
        }

    },

    on_output: function (context, done) {
        context.$send(context.$out.get('section'), done);
    }
}