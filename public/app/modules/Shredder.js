// Shredder module
define([
  // Application.
  "app",
  "../baseView",
  "../session",
  "modules/BattleRequest"
   //"modules/Twitter"
   //"../Mediator",
   ],

// Map dependencies from above array.
function(app, BaseView, Session, BattleRequest/*, Twitter*/) {

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

    // Verify shredder != Session.shredder
    // Add dig to guitar with index = guitarIndex
    // Increase shredder level with 1 for this guitarist
    addDig : function(i) {
      var that = this;
      if (this.get('_id') != Session.getUser()._id) {
        $.ajax(this.urlRoot + '/' + this.get('_id') + '/guitar/' + i + '/dig',
          {
            beforeSend : function(xhr) {
              xhr.setRequestHeader("Authorization", ("Basic ".concat(Session.getToken())));
            },
            type : 'PUT'
          })
        .done(function(res) {
          that.increaseShredderLevel(1);
        });
      } // else give error to user
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
      var that = this;

      $.ajax(this.urlRoot + "/" + this.get('_id'),
      { 
        beforeSend : function(xhr) {
              xhr.setRequestHeader("Authorization", ("Basic ".concat(Session.getToken())));
        },
        data : { shredderLevel : level },
        type : "PUT"
      })
      .done(function(res){
        that.set(res);
        that.trigger('shredderUpdated');
      });
      return true;
    },

    /*
    * Given a shredder and a list of battles; checks if they are in a battle
    */
    getIfWeAreInBattleTogether : function (shredderId, listOfBattles){
      if ( listOfBattles) {
        for ( var i = 0; i < listOfBattles.length; i++) {
          if ( this.checkIfInBattle(shredderId, listOfBattles[i])){
            return listOfBattles[i]._id;
          }
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
      if ( listOfBrs) {
        for ( var i = 0; i < listOfBrs.length; i++) {
          if ( this.checkIfIsBattlerInBr(shredderId, listOfBrs[i])){
            return listOfBrs[i];
          }
        }
      }
      return null;
    },

    checkIfIsBattlerInBr : function(shredderId, b){
      return b.battlee._id == shredderId && b.battler._id == this.get('_id');
    },

    getIfYouHaveSentMeABR : function(shredderId, listOfBrs){
      if ( listOfBrs){
        for ( var i = 0; i <listOfBrs.length; i++) {
          if ( this.checkIfIsBattleeInBr(shredderId, listOfBrs[i])){
            return listOfBrs[i]._id;
          }
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
      if ( attr.page ) this.page = attr.page;
      if ( attr.query ) this.query = attr.query;
      if ( attr.offset ) this.offset = attr.offset;
    }
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
      template : "shredders/ShredderThumb",
      selector : this.shreddersListDiv
    });
   }

   // Cleanup in parent
 });


Shredder.Views.ShredderView = BaseView.extend({
  template : "shredder/Shredder",
  battleRelationshipDiv : "#battleRelationship",


  initialize : function() {
    console.log("shredderID " + this.options.shredderId);
    this.model = new Shredder.Model({id : this.options.shredderId});
    this.model.initURL({
      withShreds : 20
    });

    this.slideWidth = 610;
    this.slideNumber = 0;
    this.listenTo(this.model, 'shredderUpdated', this.renderTemplate);
  },

  events : {
    "click #becomeFanButton" : "becomeFanClicked",
    "mousedown .dragImage" : "mouseDownEvent" ,
    "mousemove .dragImage" : "mouseMoveEvent",
    "mouseup .dragImage" : "mouseUpEvent",
    "click .guitarRightClick" : "rightClick",
    "click .guitarLeftClick" : "leftClick",
    "click .digBtn" : "digButton"
  },

  digButton : function() {
    this.model.addDig(this.slideNumber);
  },


  rightClick: function(event){
    event.preventDefault();
    this.slideLeftOrRight(1);
  },

  leftClick: function(event){
    event.preventDefault();
    this.slideLeftOrRight(-1);
  },

  slideLeftOrRight : function(step) {
    this.slideNumber += step; // 1 / 2 / 3 / 4 / ... n
    var containingUL = document.getElementById("list");
    this.slideTo(containingUL, -this.slideNumber * this.slideWidth);
  },


  slideTo : function(el, left) {
    var steps = 10;
    var timer = 25;
    var elLeft = parseInt(el.style.left, 10) || 0;
    var diff = left - elLeft;
    var stepSize = diff / steps;

    function step() {
      elLeft += stepSize;
      el.style.left = elLeft + "px";
      if (--steps) {
        setTimeout(step, timer);
      }
    }
    step();
  },

  mouseUpEvent : function(event) {
    this.mouseIsDown = false;
    if ( this.movedRight === true) {
      this.movedRight = false; 
      this.slideLeftOrRight(1);
    }else if ( this.movedLeft === true )  {
      this.movedLeft = false;
      this.slideLeftOrRight(-1);
    }
  },

  mouseDownEvent : function(event) {
    event.preventDefault();
    this.mouseIsDown = true;
    this.xCord = event.pageX;
  },

  mouseMoveEvent : function(event) {
    event.preventDefault();
    var currXcord = event.pageX;
    if ( this.mouseIsDown) {
      if ( (this.xCord - currXcord) > 40 ) {       
        this.movedRight=true;
      }else if ( (this.xCord - currXcord) < 40  ){
        this.movedLeft=true;      
      }
    }
  },

    // Overridden because we need to fetch data before rendering!
    render : function() {
      console.log("kok");
      var dfr = $.Deferred();
      var that = this;
      this.model.fetch({ 
        data : {withShreds : 5},
         success : function(){
          that.renderTemplate(dfr);
        }
        });
      return dfr.promise();
    },

    renderTemplate : function(dfr) {
      this.doRender(this.template, this.$el)
        .done(function(res) { 
          if ( dfr )
            dfr.resolve(res);
      });
    },

    // Render battle relationship
    doPostRender : function(){
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
        username : this.model.get('username')
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
      //this.render();
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
        return model;
      })
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
