// Shredder module
define([
  // Application.
  "app",
   "../baseView",
   "../session",
   "modules/BattleRequest"
   //"../Mediator",
],

// Map dependencies from above array.
function(app, BaseView, Session, BattleRequest) {

  // Create a new module.
  var Shredder = app.module();

  // Default Model.
  Shredder.Model = Backbone.Model.extend({
    urlRoot : '/api/shredders',

    shredderLvlLabels : ["Beginner", "Skilled", "Awesome", "Shred king", "Wizard"],

    defaults : {
        levelLabel : "Beginner"
    },

    initURL : function(args) {
      if ( args.withShreds ) {
        this.withShreds = args.withShreds;
      }
    },


    parse : function(response, options){

      // Set the new shredder label
      response.levelLabel = this.getLevelLabel(response.shredderLevel);
      return response;
    },

    getLevelLabel : function(currLvl) {
      if ( currLvl > 0 ) currLvl = currLvl/100;
      if (  currLvl < 20 ) {
        return this.shredderLvlLabels[0];
      } else if (  currLvl < 40 ) {
        return this.shredderLvlLabels[1];
      } else if (  currLvl < 60 ) {
        return this.shredderLvlLabels[2];
      } else if (  currLvl < 80 ) {
        return this.shredderLvlLabels[3];
      }else {
        return this.shredderLvlLabels[4];
      }
    },

    increaseShredderLevel : function(level) {

      $.ajax(this.urlRoot + "/" + this.get('_id'),
      {
        data : { shredderLevel : level },
        type : "PUT"
      });
      return true;
      // shredder.id = shredder.get('_id');
      // var currLvl = shredder.get('shredderLevel'); 
      // currLvl += level;
      // shredder.save({shredderLevel : currLvl});
    },

    /*
    * Given a shredder and a list of battles; checks if they are in a battle
    */
    getIfWeAreInBattleTogether : function (shredderId, listOfBattles){
        for ( i in listOfBattles) {
          if ( this.checkIfInBattle(shredderId, listOfBattles[i])){
            return listOfBattles[i]._id;
          }
        }
        return null;
    },

    checkIfInBattle : function(shredderId, b){
      if (this.checkIfIsBattleeInBr(shredderId, b))
        return true;
      else if (this.checkIfIsBattlerInBr(shredderId, b) )
        return true;
      else
        return false;
    },

    getIfIHaveSentYouABR : function(shredderId, listOfBrs){
      for ( i in listOfBrs) {
          if ( this.checkIfIsBattlerInBr(shredderId, listOfBrs[i])){
            return listOfBrs[i];
          }
        }
        return null;
    },

    checkIfIsBattlerInBr : function(shredderId, b){
        return b.battlee._id == shredderId && b.battler._id == this.get('_id');
    },

    getIfYouHaveSentMeABR : function(shredderId, listOfBrs){
      for ( i in listOfBrs) {
          if ( this.checkIfIsBattleeInBr(shredderId, listOfBrs[i])){
            return listOfBrs[i]._id;
          }
        }
        return null;
    },

    checkIfIsBattleeInBr : function(shredderId, b){
        return b.battler._id == shredderId && b.battlee._id == this.get('_id');
    }

  });

  // Default Collection.
  Shredder.Collection = Backbone.Collection.extend({
    model: Shredder.Model,
    page: 1,    
    offset:20,
    query: "",

    url: function() {
      return "api/shredders/" + this.query +"?page=" + this.page + "&offset=" + this.offset;
    },

    initURL: function(attr){
      if ( attr['page'] ) this.page = attr['page'];
      if ( attr['query'] ) this.query = attr['query'];
      if ( attr['offset'] ) this.offset = attr['offset'];
    },
  });



  // List of shredders View.
  Shredder.Views.ShreddersView = BaseView.extend({

    template: "shredders/Shredders",
    page : 1,
    offset : 20,
    shreddersListDiv : "#shreddersListDiv",

    events : {
      "click #nextPage" : "fetchNextPage"
    },

    initialize : function() {
      this.collection = new Shredder.Collection();
      this.collection.initURL({
        'page' : this.page,
        'offset' : this.offset
      });
    },


    fetchNextPage : function(event) {
      event.preventDefault();
      this.page ++;
      this.collection.initURL({
        'page' : this.page,
        'offset' : this.offset
      });

      $(this.shreddersListDiv).empty();
      this.collection.fetch();
    },


    postRender : function() {
      this.collection.fetch();
      this.collection.on('reset', this.renderShredCollection, this);
    },

    renderShredCollection : function() {
       this.serializeCollection({
        collection : this.collection,
        template : "shredders/shredderThumb",
        selector : this.shreddersListDiv
       });
    },

   // Cleanup in parent

  });


  Shredder.Views.ShredderView = BaseView.extend({
    template : "shredder/shredder",
    battleRelationshipDiv : "#battleRelationship",

    events : {
      "click #becomeFanButton" : "becomeFanClicked"
    },

    initialize : function() {
      console.log("shredderID " + this.options.shredderId);
      this.model = new Shredder.Model({id : this.options.shredderId});
      this.model.initURL({
        withShreds : 20
      })
    },

    // Overridden because we need to fetch data before rendering!
    render : function() {
      var dfr = $.Deferred();
      var that = this;
      this.model.fetch({ 
        data : {withShreds : 5},
        success : function(model, response){
          that.doRender(that.template, that.$el)
          .done(function(res) { 
            dfr.resolve(that);
          })
        }
         // fail : render error page :)
        });

      return dfr.promise();
    },

    // Render battle relationship
    postRender : function(){
       var that = this;

      var battleId = this.model.getIfWeAreInBattleTogether(
        Session.getUser()._id, Session.getBattles());
      if (battleId) {
        console.log("in battle: " + battleId);
        this.renderBattleRelationship("brPending", {
          shredderUsername : that.model.get('username'),
          battleId : battleId
        });
        return;
      } 

      // Special condition for incoming battle request!
      var battleReq = this.model.getIfIHaveSentYouABR(     
          Session.getUser()._id, Session.getIncomingBattleRequests() );
      if ( battleReq ) {
         this.currBattleRequest = battleReq;
         console.log("Br req: ");
        this.renderBattleRelationship("brPending", {
          shredder : this.model.toJSON(),
          model : battleReq
        })
        .done(function() {
          $('#checkBattleRequestButton').on("click",
           $.proxy(that.openBattlePendingModal, that));
          $('#acceptBattle').on("click",
           $.proxy(that.notifyAcceptBattle, that));
        });
        return;
      } 

      var battleReqId = this.model.getIfYouHaveSentMeABR(
          Session.getUser()._id, Session.getSentBattleRequests());
      if ( battleReqId ) {
        console.log("Br sent: ");
         this.renderBattleRelationship("brSent", {
          username : this.model.get('username')
        });
      return;
      }

      if ( Session.getUser()._id != this.model.get('_id')) {
        console.log("render challenge");
        this.renderBattleRelationship("challengeToBattle", {
          username : this.model.get('username'),
        })
        .done(function() {
           $('#challengeToBattleButton').on("click",
           $.proxy(that.openChallengeModal, that));
          $('#addBattleShredButton').on("click",
           $.proxy(that.createBattleRequest, that));
        });
      }
    },

    serialize : function() {
      return { 
        shredder : this.model.toJSON(),
        renderFanBtn : !this.getIsLoggedInUser()
      }; 
    },

    becomeFanClicked : function() {
      app.Mediator.publish("addFanee", this.model);
    },

    getIsLoggedInUser : function() {
      return Session.getUser()._id == this.model.get('_id');
      this.render();
    },

    openChallengeModal : function() {
      $('#challengeToBattleModal').modal("show");
    },

    createBattleRequest : function(event) {
      event.preventDefault();
      $('#challengeToBattleModal').modal("hide");
      var battleRequest = new BattleRequest.Model();
      var that = this;
      battleRequest.save(
          {battleStyle: $('#battleStyle').val()},
          {success: function(res) {
            console.log("SAP: " + JSON.stringify(res));
            battleRequest.uploadBattleShred(
              new FormData(that.$('#addBattleRequestForm')[0]));
          }}
      ); 
    },

    notifyAcceptBattle : function() {
      app.Mediator.publish("acceptBattle", this.currBattleRequest);
      $('#battleRequestModal').modal("hide");
    },

    openBattlePendingModal : function(){
      $('#battleRequestModal').modal("show");
    },
    
    renderBattleRelationship : function(template, model) {
      var dfr = $.Deferred();
      this.renderSimpleTemplate("shredder/" + template, function(){
          return model})
        .done( function(leTemplate) {
          $('#battleRelationship').html(leTemplate);
          return dfr.resolve();
        });

      return dfr.promise();
    },

    cleanUp : function() {
      console.log("Killing shredder " + this.cid);
      this.remove();
      this.unbind();
   }

  });

  // Return the module for AMD compliance.
  return Shredder;

});
