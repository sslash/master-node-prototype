define([
  // Application.
  "app",
  "modules/Main",
  "modules/ShredPool",
  "modules/Shredder",
],

function(app, Main, ShredPool, Shredder) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    rootDiv : "#main",
    mainContentDiv: "#main-content",

    initialize : function() {
      this.scaffoldingView = new Main.Views.Scaffolding();
      app.showView(this.rootDiv, this.scaffoldingView, this );
    },

    routes: {
      'shredPool' : 'renderShredPoolView',
      'shredder/:shredderId' : 'renderShredderView',
      'shredders' : 'renderShreddersView',
      'battles/:battleId' : 'renderBattleView',
      'battles' : 'renderBattlesView',
      "*actions": 'renderHomeView'
    },

    renderHomeView: function() {
      console.log("renderHomeView()");
      var mainView = new Main.Views.Home();
      app.showView(this.mainContentDiv, mainView, this.scaffoldingView);

    },

    renderShredPoolView : function() {
      console.log("renderShredPoolView()");
      var mainView = new ShredPool.View();
      app.showView(this.mainContentDiv, mainView, this.scaffoldingView);
    },

    renderShredderView : function(id) {
      console.log("renderShredderView()");
      var mainView = new Shredder.Views.ShredderView({
        shredderId : id
      });
      app.showView(this.mainContentDiv, mainView, this.scaffoldingView);
    },

    renderShreddersView : function() {
      console.log("renderShreddersView()");
      var mainView = new Shredder.Views.ShreddersView();
      app.showView(this.mainContentDiv, mainView, this.scaffoldingView);
    },  

    renderBattleView : function(id) {
      console.log("renderBattleView()");
    },

    renderBattlesView : function() {
      console.log("renderBattlesView()");
    }

  });

  return Router;

});
