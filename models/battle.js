var mongoose	 = mongoose || require('mongoose');
var schema		 = schema || mongoose.Schema;
var shred      = require('./shred');
var dbTemplate = require('../controllers/dbTemplate');
var $          = require('jquery');

var BattleRequest = mongoose.model('battleRequest', new mongoose.Schema({
  battler : {
    _id : schema.Types.ObjectId,
    username : String
  },
  battlee : {
    _id : schema.Types.ObjectId,
    username : String
  },
  timeCreated : Date,
  battleStyle : String,
  videoPath : String,
  videoThumbnail : String
}),'battleRequest');


var Battle = mongoose.model('battle', new mongoose.Schema({
  battler : {
    _id : schema.Types.ObjectId,
    imgPath : String,
    username : String
  },
  battlee : {
    _id : schema.Types.ObjectId,
    imgPath : String,
    username : String
  },
  timeCreated : Date,
  battleStyle : String,
  round : Number,
  lastBattleShred : Date,
  battleRounds : schema.Types.Mixed
}),'battle');



exports.createBattle = function(args) {
  var dfr = $.Deferred();
  var battle = new Battle(args.battle);

  battle.save(function(err, doc) {
    if (!err) {
      dfr.resolve(doc);
    } else {
      dfr.reject(err);
    }
  });
 return dfr.promise();
}

exports.deleteBattleRequest = function(uid) {
  var dfr = $.Deferred();
  BattleRequest.findById( uid.toString(), function( err, br ) {
    br.remove( function( err, doc ) {
      if( !err ) {
        dfr.resolve(doc);
      } else {
         console.log( err );
         dfr.reject(err);
      }
    });
  });

  return dfr.promise();
}

exports.updateBattleRequest = function(args){
   var dfr = $.Deferred();
  BattleRequest.findOneAndUpdate(
    {"_id" : args.uid.toString()},
    {"videoPath": args.videoPath}
  )
  .exec(function(err,doc){
    if ( !err ) {
      dfr.resolve(doc);
    }else{
      dfr.reject(err);
    }
  })  
 return dfr.promise();
}

exports.createBattleRequest = function(args) {
  var dfr = $.Deferred();
  var battleRequest = new BattleRequest(args.battleRequest);

  battleRequest.save(function(err, doc) {
    if (!err) {
      dfr.resolve(doc);
    } else {
      dfr.reject(err);
    }
  });
 return dfr.promise();
}

exports.getBattleRequestsForShredderWithId = function(uid) {
  var dfr = $.Deferred();

  BattleRequest.find({'battlee._id': uid.toString()})
  .exec(function(err, doc) {dbTemplate.callback(err,doc,dfr)});

  return dfr.promise();
}

exports.getSentBattleRequestsForShredderWithId = function(uid) {
  var dfr = $.Deferred();

  BattleRequest.find({'battler._id': uid.toString()})
  .exec(function(err, doc) {dbTemplate.callback(err,doc,dfr)});

  return dfr.promise();
}

 exports.getNewBattleswithFanees = function(args) {
  var dfr = $.Deferred();  
  shred.getFaneesForShredder(args.uid)
  .done(
    function(faneesArr){
      if ( faneesArr) {
     
       Battle.find({ $or : [
        {"battler._id" : {$in : faneesArr}},
        {"battlee._id" : {$in : faneesArr}}
        ]})
      .limit(args.offset)
      .skip((args.page)*args.offset)
      .sort('-timeCreated')
      .exec(function(err, doc) {
        dbTemplate.callback(err,doc,dfr)
      });
    }
  });

  return dfr.promise();
}

exports.getLatestBattleShredsFromFanees = function(args) {
  var dfr = $.Deferred();  
  shred.getFaneesForShredder(args.uid)
    .done(function(faneesArr){
      Battle.find({ $or : [
        {"battler._id" : {$in : faneesArr}},
        {"battlee._id" : {$in : faneesArr}}
        ]})
      .limit(args.offset)
      .skip((args.page)*args.offset)
      .sort('-lastBattleShred')
      .exec(function(err, doc) {dbTemplate.callback(err,doc,dfr)});
  });

  return dfr.promise();
}

exports.getBattlesForShredder = function(uid) {
  var dfr = $.Deferred();  
  var uidString = uid.toString();

  Battle.find()
    .or([
       {"battlee._id" : uidString},
       {"battler._id" : uidString}
    ])
    .limit(20) // Fictive, but necessary. Should instead change the dummy objects not to create 100s of battles
    .exec(function(err, doc) {dbTemplate.callback(err,doc,dfr)});
    return dfr.promise();
}

exports.getBattlesForTwo = function(shredders) {
  var shredder1 = shredders.shredder1;
  var shredder2 = shredders.shredder2;

  var dfr = $.Deferred();  

  Battle.findOne()
    .or( [
      {$and : 
        [
          {"battlee._id" : shredder1.toString()},
          {"battler._id" : shredder2.toString()}
        ]
      },
      {$and : 
        [
          {"battlee._id" : shredder1.toString()},
          {"battler._id" : shredder2.toString()}
        ]
      }
    ])
    .exec(function(err, doc) {dbTemplate.callback(err,doc,dfr)});
    return dfr.promise();
}

exports.getBattleRequestsForTwo = function(shredders) {
  var shredder1 = shredders.shredder1;
  var shredder2 = shredders.shredder2;

  var dfr = $.Deferred();  

  BattleRequest.findOne()
    .or( [
      {$and : 
        [
          {"battlee._id" : shredder1.toString()},
          {"battler._id" : shredder2.toString()}
        ]
      },
      {$and : 
        [
          {"battlee._id" : shredder1.toString()},
          {"battler._id" : shredder2.toString()}
        ]
      }
    ])
    .exec(function(err, doc) {dbTemplate.callback(err,doc,dfr)});
    return dfr.promise();
}




