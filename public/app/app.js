define([
  "backbone.layoutmanager",
  "vendor/js/libs/bootstrap/bootstrap",
  "video",
  "mediator"

], function(bl,bootstrap,video,Mediator) {

  // Provide a global location to place configuration settings and module
  // creation.
  var app = {
    // The root path to run the application.
    root: "/",

    // Call in order to fetch a template!
    fetch: function(path, done) {

      var JST = window.JST = window.JST || {};
      
      // Concatenate the file extension.
      var prefix = "app/templates/";
      var lePath = prefix + path + ".html";

      // If cached, use the compiled template.
      if (JST[lePath]) {
        return done(JST[lePath]);
      }

      // Put fetch into `async-mode`.
      //var done = this.async();

      // Seek out the template asynchronously.
      $.get(app.root + lePath, function(contents) {
        done(JST[lePath] = _.template(contents));
      });
    },

    // Function that should always be used to set a new view
    showView: function(selector, view, context) {
    if (context.currentView)
        context.currentView.close();

      // Because Some templates are fetches from DB, we need to wait
      // for them to be fetched before we can render
      view.render()
      .done(function(doneView){
        $(selector).html(doneView.$el);
        context.currentView = view;

        if(view.postRender) {
          view.postRender();
        }
      });    

      return view;
    }
  };

  app.Mediator = Mediator;

  // Mix the Show view function, Backbone.Events, modules, and layout management into the app object.
  return _.extend(app,  {
    // Create a custom object with a nested Views object.
    module: function(additionalProps) {
      return _.extend({ Views: {} }, additionalProps);
    },

    // Helper for using layouts.
    useLayout: function(name, options) {
      // Enable variable arity by allowing the first argument to be the options
      // object and omitting the name argument.
      if (_.isObject(name)) {
        options = name;
      }

      // Ensure options is an object.
      options = options || {};

      // If a name property was specified use that as the template.
      if (_.isString(name)) {
        options.template = name;
      }

      // Create a new Layout with options.
      var layout = new Backbone.Layout(_.extend({
        el: "#main"
      }, options));

      // Cache the refererence.
      return this.layout = layout;
    }
  }, Backbone.Events
  );

});
