// Main module
define([
  // Application.
  "app",
  "../baseView",

  // Modules
  "modules/Shred",
  "modules/User",
  "modules/Battle",
  "modules/BattleRequest",

  // Other
  //"mediator",
  "session"
],

// Map dependencies from above array.
function(app, BaseView, Shred, User, Battle, BattleRequest, /*Mediator,*/ Session) {

  // Create a new module.
  var Main = app.module();


  // View for all the stuff that wraps the Shredhub
  // I.e navigation bar
  Main.Views.Scaffolding = BaseView.extend({

    // easier to have two templates then lots of logic in view the other view
    template  : "main/Scaffolding",
    navbarLoggedInTmpl : "main/NavbarLoggedIn",
    navbarNotLoggedInTmpl : "main/NavbarNotLoggedIn",
    currNavbarTmpl : "main/NavbarNotLoggedIn",
    loggedIn : false,

    events : {
      "click #loginButton" : "authenticate"
    },

    initialize : function() {
      app.Mediator.subscribe("authenticationFailed", this.authenticationFailed, this);
      app.Mediator.subscribe("authenticationSuccess", this.authenticationSuccess, this);
      app.Mediator.subscribe("acceptBattle", this.acceptBattle, this);
      app.Mediator.subscribe("updateNavBar", this.updateNavBar, this);

      if ( Session.getUser() ){
        this.currNavbarTmpl = this.navbarLoggedInTmpl;
        this.loggedIn = true;
        this.overrideBackboneSync();
        app.User = new User.Model();
      }
    },

    postRender : function() {
      this.doRender(this.currNavbarTmpl, $('#leNavbar'));
    },

    authenticate : function() {
      app.User = new User.Model()
      .authenticateUser({
        username : $('#username').val(),
        password : $('#password').val()
      });
    },

    authenticationFailed : function(erroMsg) {
      $("#loginError").text(erroMsg);
    },

    serialize : function() {
      if ( this.loggedIn ) {
        return {
          user: Session.getUser(),
          battleRequests : Session.getIncomingBattleRequests()
        };
      } else {
        return {};
      }
    },

    updateNavBar : function () {
      this.doRender(this.currNavbarTmpl, $('#leNavbar'));
    },

    authenticationSuccess : function(battleRequestCollection) {
      this.battleRequestCollection = battleRequestCollection;
      $("#signInModal").modal('hide');
      this.loggedIn = true;
      console.log("logged in: " + Session.getUser()._id);
      this.overrideBackboneSync();
      this.template = this.navbarLoggedInTmpl;
      this.doRender(this.template, $('#leNavbar'));
      app.router.navigate("shredPool", true);
    },

    overrideBackboneSync : function() {
      var sync = Backbone.sync;
      app.httpToken = Session.getToken();
      Backbone.sync = function(method, model, options) {
        options.beforeSend = function(xhr){
          xhr.setRequestHeader('Authorization', ("Basic ".concat(app.httpToken)));
        };

        sync(method, model, options);
      };
    },

    // This should be a step in the User object where this happens,
    // but for simplicity I just do everything here..
    acceptBattle : function(battleRequest){
      console.log("Will accept battle!");
      var battle = new Battle.Model ({
        battler: battleRequest.battler,
        battlee: battleRequest.battlee,
        battleStyle: battleRequest.battleStyle
      });
      
      var battleShred = {
          videoPath: battleRequest.videoPath,
          videoThumbnail : battleRequest.videoThumbnail,
          timeCreated: battleRequest.timeCreated,
          rating: {
            numberOfRaters : 0,
            currentRating : 0
          }
      };      
      
      var battleRound = {
          battlersShred: battleShred,
          battleesShred: null
      };
      
      battle.get('battleRounds').push(battleRound);
      battle.save();  

      // Destroy the battleRequest
      var battleRequestModel = new BattleRequest.Model(battleRequest);
      battleRequestModel.set({'id' : battleRequest._id});
      battleRequestModel.destroy();
      
      // UpdateSession and render navbar
    }
  });

  // View That displays the home/loginpage
  Main.Views.Home = BaseView.extend({

    template : "main/Home",
    collSize: 9,
    rowSize : 3,
    shredsListDiv : "#shredsListDiv",
    shredModalDiv : "#shredModalDiv",

    initialize : function() {
      this.collection = new Shred.Collection();
      var attr = {page:1, query:'bestRated', offset:this.collSize};
      this.collection.initURL(attr);
      this.subViews = [];
      this.currentShredModalView = null;
      app.Mediator.subscribe("createShredModalView", this.createShredModalView, this);
    },

    postRender : function() {
      this.collection.fetch();
      this.collection.on( 'reset', this.addAll, this );
    },

    serialize : function() {
     return {};
    },

    cleanUp : function() {
      _.each(this.subViews, function(view) {
        view.cleanUp();
      });

      console.log("killing papi: " + this.cid);
      app.Mediator.unsubscribe("createShredModalView", this);
      this.remove();
      this.unbind();
    },

    createShredModalView : function(model) {
      var that = this;

      if ( !this.currentShredModalView){
        this.currentShredModalView = new Shred.Views.ModalView({model : model});
        this.subViews.push(this.currentShredModalView);
      } else{
        this.currentShredModalView.resetShredModel(model);
      }

      this.currentShredModalView.render()
      .done(function(view) {
       that.openShredModal(view);

      });
    },

    openShredModal : function(view) {
      $(this.shredModalDiv).empty();
      $(this.shredModalDiv).append(view.$el.html());  
      $("#playVideoModal").modal('show');
    },
    
    // Add all shreds to the shredslist.
    addAll: function() {

      var rows = this.collSize/this.rowSize;
      var end = this.collSize;
      var rowStartHtml = "<div class='row-fluid'>";
      var rowEndHtml = "</div>";
      var html = "";

      html += rowStartHtml;
      var i = 1, index = 0; // last one is for index in shredview
      var that = this;
      
      // Loop through rows of shreds, and create an HTML string.
      // For each row, wrap a set of shreds with row fluid div
      // Insert the Shreds at the end.
      // This is so neat, because the page is rendered, and THEN these are
      // added. 
      this.collection.each(function(shred){
         var shredView = new Shred.Views.ThumbnailView(
          {
           model: shred,
           index : index++,
           divId : "#shredThumb"
          });
         this.subViews.push(shredView);

         shredView.render()
          .done(function(doneView){

            html += doneView.$el.html();
            if ( i ==  end) {
              html += rowEndHtml;
              $(that.shredsListDiv).append(html);
                _.each(that.subViews, function(view) {
                 view.postRender();       
                });

            } else if ( i % rows === 0) {
              html += rowEndHtml;
              html += rowStartHtml;
            }
            i++;           
          });
      }, this);
    }
  });

  // Return the module for AMD compliance.
  return Main;

});
