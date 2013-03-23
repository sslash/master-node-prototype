// Shred module
define([
  // Application.
  "app",
  "../baseView",
  "../session",
  "modules/Battle",
  "modules/Shredder"
  
  ],

// Map dependencies from above array.
function(app, BaseView, Session, Battle, Shredder) {

  // Create a new module.
  var Shred = app.module();

  // Default Model.
  Shred.Model = Backbone.Model.extend({
    urlRoot : "/api/shreds",

    defaults : {
      videoPath : '',
      description : '',
      shredRating : {
        numberOfRaters : 0,
        currentRating : 0
      },
      shredComments: [],
      owner: {},
      tags: [],
      shredType:"normal"
    },

    parse : function(response, options){

      // Set the new shredder label
      response.id = response._id;
      return response;
    },

    uploadVideo : function(video){
      $.ajax({
        url : '/api/shreds/' + this.get('_id'), //server script to process data
        type : 'POST',
        // Form data
        data : video,
        xhr : function() { // custom xhr
          myXhr = $.ajaxSettings.xhr();
          return myXhr;
        },
        //Ajax events
        beforeSend : function() {
        },
        success : function(res) {
          console.log('done sending!');
        },
        error : function(res) {
          console.log('error occured: ' + res);
        },
        //Options to tell JQuery not to process data or worry about content-type
        cache : false,
        contentType : false,
        processData : false
      });
    },

    addRating : function(rateValue) { 
      if( rateValue <0 || rateValue > 10){
        return false;
      }
      var shredRating = this.get('shredRating');
      shredRating.numberOfRaters ++;
      shredRating.currentRating += parseInt(rateValue, 10);     
      this.increaseShredderLevel(parseInt(rateValue,10));

      this.save();
      this.trigger('change');
      return true;
    },
    
    increaseShredderLevel : function(level) {
      var shredder = new Shredder.Model(this.get('owner'));
      return shredder.increaseShredderLevel(level);
    },
    
    deleteComment : function(index) {
      var comments = this.get('shredComments');
      var intIndex = parseInt(index,10);
      comments.splice(intIndex, 1);  
      this.trigger('change');   
      this.save('shredComments', comments);
    },

    addComment : function(commentText, commenter) {
      var shredComment = {
        text : commentText,
        commenterId : commenter._id,
        commenterName : commenter.username
       // timeCreated : new Date()
      };

      var shredComments = this.get('shredComments');
      shredComments.push(shredComment);
      this.save({'shredComments': shredComments});
      this.trigger('change');
      
      // var url = "shreds/" + this.get('id') + "/comments/";
      // var that = this;
      
      // $.ajax(url, {
      //     data : JSON.stringify(shredComment),
      //     contentType : 'application/json',
      //     type : 'POST',
      //     success : function(model) {
      //    console.log("succsessfully updated comments");
      //    that.set({shredComments: model.shredComments}); 
      //  }
      // });
    }

  });

  // Default Collection.
  Shred.Collection = Backbone.Collection.extend({
    model: Shred.Model,

    url: function() {
      url =  "api/shreds/" + this.query + "?page=" + this.page + "&offset=" + this.offset;
      if ( this.extras ) {
        url += this.extras;
      }
      return url;
    },

    initURL: function(attr){
      if ( attr.page ) this.page = attr.page;
      if ( attr.query ) this.query = attr.query;
      if ( attr.offset ) this.offset = attr.offset;
    },
    
    page : 1,
    
    query: "",
    
    advancePage : function(){
      this.page ++;
    },
    
    setQuery : function(q) {
      this.query = q;
    },
    
    setUrl : function(newUrl) {
      this.url = newUrl;
    }

  });


Shred.Views.ThumbnailView = BaseView.extend({

    template: "Shred",

    initialize : function() {
     // _.extend(this, Backbone.Events);
     this.divId = this.options.divId + "_" + this.options.index; 
     _.bindAll(this);
     if ( this.options.template ){
      this.template = this.options.template;
    }
    },

  serialize : function() {
    return {"shred" : this.model.toJSON(), index : this.options.index};
  },

  postRender : function() {
    this.setListeners();
  },

  setListeners : function() {
    $(this.divId).on('click', this.openShredModal);
  },

  unsetListeners : function() {
    $(this.divId).off('click', this.openShredModal);
  },

  resetListeners : function() {
    this.unsetListeners();
    this.setListeners();
  },

  openShredModal : function(event) {
    event.preventDefault();
    app.Mediator.publish("createShredModalView", this.model);
  },

  cleanUp : function() {
    console.log("Killing myself: " + this.cid);
    this.unsetListeners();
    this.remove();
    this.unbind();
  },

  resetShredModel : function(newModel) {
    this.model = newModel;
  }

});



Shred.Views.RowView = BaseView.extend({
  page : 1,
  offset : 20,
  advancePage : 1,

    //events : {      
      //"click .newShredsFromFaneesAncor" : "showVideoView",
      //"keypress #tagSearch" : "populateShredsWithTags",
     // "click .nextShred" : "nextShreds"
    //},  

    initialize : function() {       
      if ( !this.options.windowSize) {
        this.options.windowSize = 4;
        this.options.startCollIndex = 5;
      }
      this.options.currVindowIndex = this.options.startCollIndex; 
      this.template = this.options.template;    

      this.collection =  new Shred.Collection();
      this.collection.initURL({
        'page' : this.options.page || this.page,
        'offset' : this.options.offset || this.offset,
        'query' : this.options.query
      });

      if ( this.options.nextBtn) {
        this.nextBtn = this.options.nextBtn;
      }

      if ( !this.renderFn ) {
        this.renderFn = this.addAll;
      }

      this.subViews = [];
    },

    postRender : function() {
      if (this.nextBtn){
        $(this.nextBtn).on('click', $.proxy(this.nextShreds,this));
      }
      this.collection.fetch();
      this.collection.on( 'reset', this.renderFn, this );

      if ( this.options.tagSearch){
        $("#tagSearch").on('keypress', $.proxy(this.fetchByTags,this));
      }
    },

    fetchByTags : function() {
      if(event.keyCode == 13) {  
        var val = event.currentTarget.value;        
        var tagsList = val.split(/,\s*/g);
      this.fetchShredsByTags(tagsList);
      }
    },

    fetchShredsByTags : function(tagsList) {
       var query= _.reduce( tagsList, function(memo, arg) {
        return memo + "&tag=" + arg;
       }, "");

      this.collection.extras = query;
      this.collection.fetch();
    },

    addAll: function() {
      var that = this;
      var index = (this.options.startCollIndex - this.options.currVindowIndex) * this.options.windowSize;
      
     this.clearCollection();
      _.each(_.first(this.collection.models, this.options.windowSize), function(shred){
        var shredView = new Shred.Views.ThumbnailView({
         template : that.options.shredTemplate,
         model: shred,
         index : index++,
         divId : that.options.divPrefix
       });
        that.subViews.push(shredView); 
        that.showChildView(that.options.selector, shredView, that);
      });        
    },

    // Might consider factoring this one out..
    addAllInOne : function() {
      var columns = 6;
      var end = 18;
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
      this.clearCollection();
      this.collection.each(function(shred){
       var shredView = new Shred.Views.ThumbnailView(
       {
        template : that.options.shredTemplate,
        model: shred,
        index : index++,
        divId : that.options.divPrefix
      });
       this.subViews.push(shredView);

       shredView.render()
       .done(function(doneView){

        html += doneView.$el.html();
        if ( i ==  end) {
          html += rowEndHtml;
          $(that.options.selector).append(html);
          _.each(that.subViews, function(view) {
           view.postRender();       
         });

        } else if ( i % columns === 0) {
          html += rowEndHtml;
          html += rowStartHtml;
        }
        i++;           
      });
     }, this);
    },

    clearCollection : function() {
      _.each(this.subViews, function(v){
        v.cleanUp();
      });
      this.subViews = [];
      $(this.options.selector).empty();

    },

    cleanUp : function() {
      _.each(this.subViews, function(v){
        v.cleanUp();
      });
      console.log("Cleaning up row view: " + this.cid);
      this.remove();
      this.unbind();
    },

    nextShreds : function(event) {
      event.preventDefault();

      if (this.options.currVindowIndex == this.advancePage){
        this.collection.advancePage();
        this.options.currVindowIndex = this.options.startCollIndex;
        this.collection.fetch({});
      } else {
        this.options.currVindowIndex --;
        this.moveRow();
      } 
    },

    moveRow : function() {
      var that = this;
      var start = (this.options.startCollIndex - this.options.currVindowIndex) * this.options.windowSize;
      var stop = start + this.options.windowSize;
      $(this.options.selector).empty();
       // Should maybe reset listeners before empty?

       for ( var i = start, y=0; i < stop; i++, y++){
        var model = this.collection.at(i);
        this.subViews[y].resetShredModel(model);
         this.subViews[y].render()
         .done(function(view) {
           $(that.options.selector).append(view.$el.html()); 
           view.resetListeners();  
         });
      }
    }
  }),


Shred.Views.ModalView = BaseView.extend({

  template: "shred/shredModal",

    rateShred : function(event) {
      event.preventDefault();
      var rateVal = $('input[type=range]').val();
      this.model.addRating(rateVal);
    },

    initialize : function() {
      //Mediator.subscribe("resetShredModel", this.resetShredModel, this);     
    },

    serialize : function() {
      return {"shred" : this.model.toJSON()};
    },

    notifyOnChange : function() {
      console.log("yeah");
      app.Mediator.publish("createShredModalView", this.model);
    },

    resetShredModel : function(newModel) {
      this.stopListening(this.model, 'change', this.notifyOnChange);
      this.model = newModel;
    },

    postRender : function() {
       $('#rateButton').on("click", $.proxy(this.rateShred, this));
       $('#commentButton').on("click", $.proxy(this.saveComment, this));
       $('td .close').on("click", $.proxy(this.deleteComment, this));
      this.listenTo(this.model, 'change', this.notifyOnChange);
    },

    deleteComment : function(event) {
      var commentIndex = event.currentTarget.id.split("-")[1];
      this.model.deleteComment(commentIndex);
    },
    
    saveComment : function(event) {
      event.preventDefault();
      this.model.addComment($('#commentText').val(), Session.getUser());
    },

    cleanUp : function() {
      console.log("Killing shredmodal " + this.cid);
      this.remove();
      this.unbind();
   }

 });

  Shred.Views.ShredNewsView = BaseView.extend({
    template : "shredpool/ShredNews",



    initialize : function() {   
      this.shredderId = this.options.shredderId;    
      this.newestShreds = new Shred.Collection();
      this.newestShreds.initURL({
        page : 1,
        offset : 5,
        query : "newShredsFromFanees/" + this.shredderId
      });
      this.newestBattles = new Battle.Collection();
      this.newestBattles.initURL({
        query:"withFanees/"+ this.shredderId,
        page : 1,
        offset: 3
      });

      this.mightLikeShredders = new Shredder.Collection(); 
      this.mightLikeShredders.initURL({
        query : "mightKnowShredders/" + this.shredderId,
        page : 1,
        offset : 5
      });
      this.battleShredsFromFanees = new Battle.Collection();
      this.battleShredsFromFanees.initURL({
        query : "withLatestBattleShredsFromFanees/" + this.shredderId,
        page : 1,
        offset : 6
      });
    },

    postRender : function() {
      this.newestShreds.fetch();
      this.newestShreds.on('reset', this.renderNewestShreds, this);
      this.newestBattles.fetch();
      this.newestBattles.on('reset', this.renderNewestBattles, this);
      this.mightLikeShredders.fetch();
      this.mightLikeShredders.on('reset', this.renderMighLikeShredders, this);
      this.battleShredsFromFanees.fetch();
      this.battleShredsFromFanees.on('reset', this.renderBattleShredsFromFanees, this);
    },

    renderNewestShreds : function() {
       this.serializeCollection({
        collection : this.newestShreds,
        template : "shredpool/ShredNews_fromFanees",
        selector : '#newShredFromFaneeNewsItem'
      });
    },

    renderNewestBattles : function() {
       this.serializeCollection({
        collection : this.newestBattles,
        template : "shredpool/ShredNews_newBattles",
        selector : "#newBattlesFromFanees"
       });
    },

    renderMighLikeShredders : function() {
       this.serializeCollection({
        collection : this.mightLikeShredders,
        template : "shredpool/ShredNews_shreddersMightLike",
        selector : "#shreddersYouMightLike"
      });
    },

    renderBattleShredsFromFanees : function() {
      this.serializeCollection({
        collection : this.battleShredsFromFanees,
        template : "shredpool/ShredNews_battleShreds",
        selector : "#latesBattleShreds"
       });
    },

    cleanUp : function() {
      this.remove();
    }

  });

  // Return the module for AMD compliance.
  return Shred;

});
