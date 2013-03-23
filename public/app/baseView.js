define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  var BaseView = Backbone.View.extend({

    // Override this!
    serialize : function() {
      return {};
    },


    // This is often overridden in subclass views
     cleanUp : function() {
      this.remove();
      this.unbind();
    },

    // Call before new view is rendered!
    close : function () {

      // Must be implemented in subviews
      this.cleanUp(); 
     // this.remove();
      //this.unbind();
    },

    renderSimpleTemplate : function(leTemplate, serializer) {
      var dfr = $.Deferred();
      var that = this;      
      app.fetch(leTemplate, function(templateFn){
        dfr.resolve(templateFn(serializer()));
      });
      return dfr.promise();
    },

     serializeCollection : function(args) {
      args.collection.each(function(model){
         this.renderSimpleTemplate(args.template,
          function(){
            return {
             'model' : model.toJSON()
            };
          })
        .done(function(template){
        
          $(args.selector).append(template);
        });
      },this);

    },


    doRender : function(leTemplate, selector) {
      var dfr = $.Deferred();
      var that = this;      
      app.fetch(leTemplate, function(templateFn){

        var markup = templateFn(that.serialize());
        selector.html(markup);
        dfr.resolve(that);
      });
      return dfr.promise();
    },


    // Call in order to render the view!
    render : function() {
      var dfr = $.Deferred();
      var that = this;
      this.doRender(this.template, this.$el)
      .done(function(res) {
        dfr.resolve(that);
      });
      return dfr.promise();
    },

    showChildView: function(selector, view, context) {
      // Because Some templates are fetches from DB, we need to wait
      // for them to be fetched before we can render     

      view.render()
      .done(function(doneView){
        $(selector).append(doneView.$el.html());
        context.currentView = view;

        if(view.postRender) {
          view.postRender();
        }
      });

      return view;
    }

  });

  return BaseView;
});
