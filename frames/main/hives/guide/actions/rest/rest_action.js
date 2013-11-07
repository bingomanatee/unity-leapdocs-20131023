

module.exports = {

    on_validate: function(context, done){
        if(!context.language){
            done (new Error('language required'));
        } else if (!context.item){
            done(new Error('item required'));
        } else {
            done();
        }
    },

    on_input: function(context, done){
        var model = this.model('guide')
        if (context.section){
            model.section(context.section, context.item, context.language, function(err, s){
                if (err){
                    done(err);
                } else {
                    context.$send(s, done);
                }
            });
        } else {
            model.toc_item(context.item, context.language, function(err, item){
                if (err){
                    done(err);
                } else {
                    context.$send(item, done);
                }
            });
        }

    }

}