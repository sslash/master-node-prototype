// User module
define([
  // Application.
  "app",
  "session",
  "modules/BattleRequest"
  ],

// Map dependencies from above array.
function(app, Session, BattleRequest) {

  // Create a new module.
  var User = app.module();

  // This represents an authenticated User!
  User.Model = Backbone.Model.extend({

    initialize : function() {
     app.Mediator.subscribe("addFanee", this.addFaneeRelationship, this);
    },

    authenticateUser : function(attr){
      if ( ! attr.username || !attr.password){
        app.Mediator.publish("authenticationFailed", "Wrong username or password");
        return;
      }
      console.log("authenticateUser() " + attr.username + " " + attr.password);

      // Super simple authentication mechanism
      var token = window.btoa(attr.username + ':' + attr.password);
      var that = this;
      $.ajax({
        url : '/api/authenticate',
        dataType : 'json',
        type:'POST',
        beforeSend : function(xhr) {
          xhr.setRequestHeader("Authorization", "Basic " + token);
        },
        error : function(err) {
          app.Mediator.publish("authenticationFailed", "Wrong username or password");
        },
        success : function(data){
          Session.setUser(data);
          Session.setToken(token);
          that.fetchBattleRequests()
          .done(function(battleRequestCollection){
          Session.setIncomingBattleRequests(battleRequestCollection);
          
          // Store on session here, if wanted
          app.Mediator.publish("authenticationSuccess", battleRequestCollection);                    
          that.populateSessionData();
          });
      }
  });
},

addFaneeRelationship : function(fanee) {
    // Check if they are friends already
    var that = this;
    $.ajax({
      type : "PUT",
      url : "/api/shredders/" + Session.getUser()._id + "/addFanee/",
      data : fanee.toJSON(),
      success : function(res) {
        console.log("res: " + res);
        that.updateSessionAddFanee(fanee.toJSON());
      }
    });
},

updateSessionAddFanee : function(fanee) {
  var user = Session.getUser();
  user.fanees.push(fanee);
  Session.setUser(user);
  app.Mediator.publish("updateNavBar");
},

/*
* Fetches necessary data like battles and sentout battlerequests
*/
populateSessionData : function(){

  // Fetch battle requests sent out
  $.getJSON('/api/battleRequests/sent/' + Session.getUser()._id,
    function(res) {
      Session.setSentBattleRequests(res);
  });

  // Fetch battles
  $.getJSON('/api/battles/' + Session.getUser()._id,
    function(res) {
      Session.setBattles(res);
  });

},

fetchBattleRequests : function() {
  var dfr = $.Deferred();

  var battleCollection = new BattleRequest.Collection();
  battleCollection.setShredderId(Session.getUser()._id);

  battleCollection.fetch({
    beforeSend: function(xhr){
       xhr.setRequestHeader('Authorization', ("Basic ".concat(Session.getToken())));
    },
    success : function(res) { 
      dfr.resolve(battleCollection);
    }
  });      

  return dfr.promise();
}

});

  // Return the module for AMD compliance.
  return User;

});
