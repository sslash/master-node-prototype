// Shred module
define([
  // Application.
  "app",
  "../baseView",
  "session",
  "modules/Shred"
  
  ],

// Map dependencies from above array.
function(app, BaseView,  Session, Shred) {

  // Create a new module.
  var ShredPool = app.module();

  ShredPool.View = BaseView.extend({

    template: "shredpool/ShredPool",
    shredModalDiv : "#shredModalDiv",

    // Selectors
    shredsFromFaneesDiv : "#newShredsFromFanees",
    topShredsDiv : "#topShreds",
    mightKnowShredsDiv : "#mightKnowShreds",
    shredsByTagsDiv : "#shredsByTags",
    shredNewsDiv : "#shredNews",

    events : {
      "click #openAddShredModal" : "openCreateShredModal",
      "click form #uploadButton" : "saveShredClicked"
    },

    openCreateShredModal : function() {
      $('#addShredModal').modal('show');
    },

    saveShredClicked : function(event) {
      event.preventDefault();
      var shredder = Session.getUser();
      var that = this;  
      
      var tags = $('#inputTags').val();
      var tagsArr = tags.split(/,\s*/g);
      var video = new FormData( $('#addShredForm')[0] ); 

      // save the shed
      var newShred = new Shred.Model();
      newShred.save({
        description : $('#inputDescription').val(),
        owner : {
          _id : shredder._id,
          username : shredder.username,
          imgPath : shredder.imgPath
        }, // nice cause java can convert eagerly with dbrefs
        timeCreated : new Date(),
        videoPath : "",
        videoThumbnail : "",
        shredComments : [],
        tags : tagsArr,
        shredRating : {
          numberOfRaters : 0,
          currentRating : 0
        },
        shredType : 'normal'
      }, {
        success : function() {
          console.log("Save shred success. will save video");
          newShred.uploadVideo(video);
        } 
      });
      $('#addShredModal').modal('hide');
    },



    initialize : function() {    
      this.subViews = [];
      this.currentShredModalView = null;
      app.Mediator.subscribe("createShredModalView", this.createShredModalView, this);
      var shredderId = Session.getUser()._id;

      this.shredsFromFaneesView = new Shred.Views.RowView(
      {
        //el:"#newShredsFromFanees",
        query : "newShredsFromFanees/" + shredderId,
        template : "shredpool/ShredsRow_fromFanees", // Template for the rows
        selector : "#shredsFromFaneesListDiv",
        shredTemplate : "shredpool/ShredInRow", // Template for a thumbnail
        divPrefix : "#fromFanees", // prefix for shredtemplates' div
        nextBtn : ".nextFromFanees"
      }); 
      this.subViews.push(this.shredsFromFaneesView);

      this.shredNewsView = new Shred.Views.ShredNewsView({
        shredderId : shredderId
      });
     //var shredNewsView = new Shred.Views.RowView({el: "#shredNews"});
    // shredNewsView.render();
    // console.log("rendered new shreds view");
    
    this.topShredsView = new Shred.Views.RowView(
    {
      windowSize : 2,
      startCollIndex : 10,
      query : "bestRated/",
        template : "shredpool/ShredsRow_topRated", // Template for the rows
        selector : "#topShredsListDiv", // Where shreds are appended
        shredTemplate : "shredpool/ShredInRow_topRated", // Template for a thumbnail
        divPrefix : "#topShreds", // prefix for shredtemplates' div
        nextBtn : ".nextTopShreds"
      });   
    this.subViews.push(this.topShredsView);



    this.mightKnowView = new Shred.Views.RowView(
    {
      windowSize : 3,
      startCollIndex : 7,
      query : "shredsYouMightKnow/" + shredderId,
      offset : 21,
        template : "shredpool/ShredsRow_mightKnow", // Template for the rows
        selector : "#mightKnowShredsListDiv", // Where shreds are appended
        shredTemplate : "shredpool/ShredInRow_mightKnow", // Template for a thumbnail
        divPrefix : "#mightKnow", // prefix for shredtemplates' div
        nextBtn : ".nextMightKnow"
      }); 
    this.subViews.push(this.mightKnowView);

    // Should create a separate view for tags view
    this.shredsByTagsView = new Shred.Views.RowView(
    {
      query : "ShredsByTags/" + shredderId,
      offset : 18,
        template : "shredpool/ShredsRow_byTags", // Template for the rows
        selector : "#shredsByTagsListDiv", // Where shreds are appended
        shredTemplate : "shredpool/ShredInRow_byTags", // Template for a thumbnail
        divPrefix : "#byTags", // prefix for shredtemplates' 
        tagSearch : true // Such an ugly solution..
      }); 
    this.subViews.push(this.shredsByTagsView);

      // Ugly and hacky solution to use a complex render function
      this.shredsByTagsView.renderFn = 
      this.shredsByTagsView.addAllInOne;
    },


    postRender : function() {
      this.showChildView(this.shredsFromFaneesDiv, this.shredsFromFaneesView, this);
      this.showChildView(this.shredNewsDiv, this.shredNewsView, this);
      this.showChildView(this.topShredsDiv, this.topShredsView, this);
      this.showChildView(this.mightKnowShredsDiv, this.mightKnowView, this);
      this.showChildView(this.shredsByTagsDiv, this.shredsByTagsView, this);
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
       view.postRender();
     });
    },

    openShredModal : function(view) {
      /* Hacky way to avoid background fading */
      $("#playVideoModal").modal('hide');
      $(this.shredModalDiv).empty();
      $(this.shredModalDiv).append(view.$el.html());    
      $("#playVideoModal").modal('show');
    },

    cleanUp : function() {

      // Clean up all the rows
      _.each(this.subViews, function(view) {
        view.cleanUp();
      });

      console.log("killing shredpool: " + this.cid);
      app.Mediator.unsubscribe("createShredModalView", this);
      this.remove();
      this.unbind();
    }

  });

  // Return the module for AMD compliance.
  return ShredPool;

});
