var mongoose	  = mongoose || require('mongoose');
var schema		  = mongoose.Schema;
var shred       = require('./shred');
var dbTemplate  = require('../controllers/dbTemplate');
var $           = require('jquery');

exports.Shredder = mongoose.model('shredder', new mongoose.Schema({
  _id : schema.Types.ObjectId,
  username: String,
  timeCreated : Date,
  fanees : [schema.Types.Mixed],
  shredderLevel : Number,
}),'shredder');



exports.getShredderById = function(uid, withShreds) {
  var dfr = $.Deferred();

  exports.Shredder.findById(uid, function(err,doc){
    if ( withShreds ) {
      shred.getShredsByShredder({
        offset : withShreds,
        page : 0,
        uid : uid
      })
      .done(function(shredsRes){
        var toRet = doc.toJSON();
        toRet.shreds = shredsRes;
        dbTemplate.callback(err,toRet,dfr);
      })
    } else {
      dbTemplate.callback(err,doc,dfr);
    }    
  });
 return dfr.promise();
}

exports.updateShredder = function( uid, body) {
  var dfr = $.Deferred();
  exports.Shredder.findById( uid.toString(), function( err, shredder ) {

      // Only support update shredderLevel as for now..
      var newLevel = body.shredderLevel;

      if ( newLevel > 10 || newLevel < 0) {
        dfr.reject("Illegal rate value!");
      }else{
        shredder.shredderLevel += parseInt(newLevel);
        shredder.save( function( err ) {
            if( !err ) {
                console.log( 'shredder updated ' + shredder.toString() );
                dfr.resolve(shredder);
            } else {
                console.log( err );
                dfr.reject(err);
            }            
        });
      }
    });
   return dfr.promise();
}

exports.getAllShreddersByTimeCreated = function(args) {
    var dfr = $.Deferred();
    // Could check for ne self. But arch 1 doesn't do it..
    exports.Shredder.find()
      .sort('-timeCreated')
      .limit(args.offset)
      .skip(args.page*args.offset)
      .exec(function(e, d){ dbTemplate.callback(e,d,dfr);});

  return dfr.promise();
}

exports.addFaneeForShredderWithId = function(uid, fanee) {
   var dfr = $.Deferred();

   exports.Shredder.update(
   { _id: uid.toString() },
   {
     $push: { fanees: { 
      _id: fanee._id,
      profileImagePath: fanee.profileImagePath,
      username: fanee.username } }
   },
    function(err, rows, shredder) {
      if (!err){
        exports.Shredder.findById(uid, function(err,doc){
          dbTemplate.callback(err,doc,dfr);
        });
      } else {
        console.log("failed to add fanee: " + err);
        dfr.reject(err);
      }
    }
   );
  return dfr.promise();
}

exports.getShreddersShredderMightLike = function(args) {
    var dfr = $.Deferred();
    var self = mongoose.Types.ObjectId(args.uid);
    exports.Shredder.findById(args.uid,function(err, shredder){
    if (!err){
      exports.Shredder.find()
      .where("_id").ne(self)
      .or([
        {
          "guitars" : {$in : shredder.get('guitars')}
        },
        {
          "equiptment" : {$in : shredder.get('equiptment')}
        },
        {
          "country" : shredder.get('country')
        }
        ])
      .sort('-timeCreated')
      .limit(args.offset)
      .skip(args.page*args.offset)
      .exec(function(e, d){ dbTemplate.callback(e,d,dfr);});
    }
  });

  return dfr.promise();
}
