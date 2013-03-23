// Battle module
define([
  // Application.
  "app"
  ],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Battle = app.module();

  // Default Model.
  Battle.Model = Backbone.Model.extend({
    urlRoot : '/api/battles',
    
    defaults : {
      battler : {},
      battlee : {},
      battleStyle : '',
      round : 1,
      battleRounds : []
    }

  });

  // Default Collection.
  Battle.Collection = Backbone.Collection.extend({
    model: Battle.Model,

    url : function() {
      return '/api/battles/' + this.query + "?page=" + this.page + "&offset=" + this.offset; 
    },
    
    initURL: function(attr){
      if ( attr.page ) this.page = attr.page;
      if ( attr.query ) this.query = attr.query;
      if ( attr.offset ) this.offset = attr.offset;
    }

  });

  // Default View.
  Battle.Views.Battle = Backbone.Layout.extend({
    template: "battle"
  });

  // Return the module for AMD compliance.
  return Battle;

});
