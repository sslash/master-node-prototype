// Battlerequest module
define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var BattleRequest = app.module();

  // Default Model.
  BattleRequest.Model = Backbone.Model.extend({
    urlRoot : '/api/battleRequests/',
    defaults: {
      battler: {},
      battlee: {}, 
      battleStyle: '',
      videoPath: '',
      videoThumbnail: ''
    },  

    uploadBattleShred : function(formData) {
          var that = this;  
          $.ajax({
              url: this.urlRoot + this.get('_id'), 
              type: 'POST', // Should be put, but has to be POST due to spring 
              xhr: function() {  // custom xhr
                  myXhr = $.ajaxSettings.xhr(); 
                  if(myXhr.upload){ // check if upload property exists
                      //myXhr.upload.addEventListener('progress',that.progressHandlingFunction, false); // for handling the progress of the upload
                  } 
                  return myXhr;
              },
              //Ajax events
              beforeSend: function(){},
              success: function(res){
                console.log('done sending!'); 
                //$(that.modal).modal('hide');  
              },
              error: function(res){
                console.log('error occured: ' + res);
              },  
              // Form data
              data: formData, 
              //Options to tell JQuery not to process data or worry about content-type
              cache: false,
              contentType: false,
              processData: false
          });
    }

  });

  // Default Collection.
  BattleRequest.Collection = Backbone.Collection.extend({
    model: BattleRequest.Model,

    url : function() {
      return "api/battleRequests/shredder/" + this.shredderId;
    }, 

    setShredderId : function(id) {
      this.shredderId = id;
    },


  });

  // Return the module for AMD compliance.
  return BattleRequest;

});
