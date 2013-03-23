// Twitter module
define([
  // Application.
  "app",
   "../baseView"
],

// Map dependencies from above array.
function(app, BaseView) {

  // Create a new module.
  var Twitter = app.module();

  // Default Model.
  Twitter.Model = Backbone.Model.extend({
  });

  // Default Collection.
  Twitter.Collection = Backbone.Collection.extend({
    url: function () {
      return 'http://search.twitter.com/search.json?q=' + this.query + '&page=' + this.page + '&callback=?';
    },
    // Because twitter doesn't return an array of models by default we need
    // to point Backbone.js at the correct property
    parse: function(resp, xhr) {
      return resp.results;
    },
    page: 1,
    query: 'Guitars'
  });

  // Default View.
  Twitter.Views.Main = BaseView.extend({
    template: "Twitter",
     //el: '.twitter-widget',

    initialize: function () {
      // isLoading is a useful flag to make sure we don't send off more than
      // one request at a time
      this.isLoading = false;
      this.twitterCollection = new Twitter.Collection();
    },

    render: function () {
      var dfr = $.Deferred();
      console.log("HEIR");
      var that = this;
      // we are starting a new load of results so set isLoading to true
      //this.isLoading = true;
      // fetch is Backbone.js native function for calling and parsing the collection url
      this.twitterCollection.fetch({
        //beforeSend : null, 
        error: function(collection, response, options){
          console.log("SAP: " + response);
        },
        
        success: function (tweets) {
          // Once the results are returned lets populate our template
          that.renderSimpleTemplate(that.template, that.serialize)
          .done(function(complTemplate){
            dfr.resolve(complTemplate);  
          });
          
         // $(that.el).append(_.template(TwitterListTemplate, {}));
          // Now we have finished loading set isLoading back to false
          //that.isLoading = false;
        }
      });   
      return dfr.promise();   
    },

    serialize : function() {
      return {tweets: this.twitterCollection.models};
    }
  });


  // Return the module for AMD compliance.
  return Twitter;

});
