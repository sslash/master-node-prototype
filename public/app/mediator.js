define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app, mediator) {

  var channels = {};
  if (!mediator) mediator = {};

  
  mediator.subscribe = function (channel, subscription, context) {
    if (!channels[channel]) channels[channel] = [];

    subscriber = {
      context : context,
      subscription : subscription
    };

    channels[channel].push(subscriber);
    console.log("channels: " +channel + " l: " + channels[channel].length);
  };

  // Remember to clean up your dirt!
  mediator.unsubscribe = function(channel, context) {
    for (var i = 0, l = channels[channel].length; i < l; i++) {
      var subscriber = channels[channel][i];
      if ( subscriber.context == context ) {
        console.log("found equal " ) 
        channels[channel][i] = null;
        console.log("channels: " + channel + " Length: " + channels[channel][i]);
        break;
      }
    }
    channels[channel] = _.compact(channels[channel]);
        console.log("channels after: " + channel + " Length: " + channels[channel].length);

  };

  mediator.publish = function (channel) {

  
    console.log("publishing now");
    if (!channels[channel]) return;
    var args = [].slice.call(arguments, 1);
    for (var i = 0, l = channels[channel].length; i < l; i++) {
      var subscriber = channels[channel][i];
      if ( subscriber != null) {
        console.log("publishing");
        subscriber.subscription.apply(subscriber.context, args);
      }
    }
  };

  return mediator;
});
