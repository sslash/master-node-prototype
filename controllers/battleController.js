var battle    = require('../models/battle'),
dbTemplate		= require('./dbTemplate'),
fileUploader  = require('../fileUploader'),
$             = require('jquery');


exports.getBattleRequestsForShredderWithId = function(req, res) {
  return battle.getBattleRequestsForShredderWithId(req.params.uid)
  .done(function(battleRequests){
    return res.send(battleRequests); 
  })
  .fail(function(err){
    return res.send(null);
  });
}

exports.getSentBattleRequestsForShredderWithId = function(req,res){
  return battle.getSentBattleRequestsForShredderWithId(req.params.uid)
  .done(function(battleRequests){
    return res.send(battleRequests); 
  })
  .fail(function(err){
    return res.send(null);
  });
} 

exports.createBattle = function(req,res) {
  if ( !req.body) {
    res.statusCode = 400;
    return res.send(null);
  }

  return battle.createBattle({
    battle : req.body
  }).done(function(doc){
   // if ( doc ) 
     // console.log("createbattle(): " + doc.toString());
    return res.send(doc); 
  })
  .fail(function(err){
    //console.log("create battle failed.." + err);
    return res.send(null);
  });
}

exports.createBattleRequest = function(req,res) {
  if ( !req.body) {
    res.statusCode = 400;
    return res.send(null);
  }

  return battle.createBattleRequest({
    battleRequest : req.body
  }).done(function(doc){
    if ( doc ) 
     // console.log("createbattleRequest(): " + doc.toString());
    return res.send(doc); 
  })
  .fail(function(err){
   // console.log("create battle request failed.." + err);
    return res.send(null);
  });
}

exports.deleteBattleRequest = function(req,res) {
return battle.deleteBattleRequest(req.params.uid)
  .done(function(battleRequest){
    return res.send(battleRequest); 
  })
  .fail(function(err){
    return res.send(null);
  });
}

exports.updateBattleRequest = function(req, res, next) {
  if ( !req.body  || !req.files.file || !req.params.uid) {
    res.statusCode = 400;
    return res.send(null);
  }
 // console.log("Battle req file: " + req.files.file);

  var uid = req.params.uid;
  var filename = uid + "-" + req.files.file.name;
  var args = {
    file : req.files.file,
    filename : filename,
    path : './public/vidz/'
  }
  
  fileUploader.uploadFile(args)
  .done(function(file){
    console.log("saved file: " + JSON.stringify(file));

    battle.updateBattleRequest({
      uid : req.params.uid,
      videoPath : file.file.name
    })
    .done(function(doc){
      console.log("battleRequest updated: " + JSON.stringify(doc));
      res.send(doc);
    })
    .fail(function(err){
      console.log("battleRequest updated failed " + err);
      res.send(null);
    })
  })
  .fail(function(err){
    console.log("saved file filed:" + err);
    res.send(null);
  })
}

/* Shredhub 1.0 API */
exports.getNewBattleswithFanees = function(req, res) {
  return dbTemplate.callDb(
  {
    callback: battle.getNewBattleswithFanees,
    req: req,
    res: res,
    msg: "getNewBattleswithFanees"
  });

}

exports.getLatestBattleShredsFromFanees = function(req,res) {
	return dbTemplate.callDb(
  {
   callback: battle.getLatestBattleShredsFromFanees,
   req: req,
   res: res,
   msg: "getLatestBattleShredsFromFanees"
 });
}

exports.getBattlesForTwo = function(req,res) {
  if ( !req.param('shredder1') || ! req.param('shredder2') ){
    res.statusCode = 400;
    return res.send(null);
  }

  return battle.getBattlesForTwo(
    {
      shredder1 : req.param('shredder1'),
      shredder2 : req.param('shredder2')    
    }
  ).done(function(doc){
    if ( doc ) 
     // console.log("getBattlesForTwo(): " + doc.toString());
    return res.send(doc); 
  })
  .fail(function(err){
    //console.log("battleForTwoFailed.." + err);
    return res.send(null);
  });
}

exports.getBattlesForShredder = function(req, res){
  return battle.getBattlesForShredder(req.params.uid)
  .done(function(battles){
    //console.log("battles: " + battles.length);
    return res.send(battles); 
  })
  .fail(function(err){
    //console.log("battles failed..");
    return res.send(null);
  });
}

exports.getBattleRequestsForTwo = function(req,res) {
  if ( !req.param('shredder1') || ! req.param('shredder2') ){
    res.statusCode = 400;
    return res.send(null);
  }

  return battle.getBattleRequestsForTwo(
    {
      shredder1 : req.param('shredder1'),
      shredder2 : req.param('shredder2')    
    }
  ).done(function(doc){
    if ( doc ) 
      //console.log("getBattleRequestsForTwo(): " + doc.toString());
    return res.send(doc); 
  })
  .fail(function(err){
    //console.log("battleRequestsForTwoFailed.." + err);
    return res.send(null);
  });
}