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
    return res.send(doc); 
  })
  .fail(function(err){
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
    return res.send(doc); 
  })
  .fail(function(err){
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
  var uid = req.params.uid;
  var filename = uid + "-" + req.files.file.name;
  var args = {
    file : req.files.file,
    filename : filename,
    path : './public/vidz/'
  }
  
  fileUploader.uploadFile(args)
  .done(function(file){

    battle.updateBattleRequest({
      uid : req.params.uid,
      videoPath : file.file.name
    })
    .done(function(doc){
      res.send(doc);
    })
    .fail(function(err){
      res.send(null);
    })
  })
  .fail(function(err){
    res.send(null);
  })
}

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
    return res.send(doc); 
  })
  .fail(function(err){
    return res.send(null);
  });
}

exports.getBattlesForShredder = function(req, res){
  return battle.getBattlesForShredder(req.params.uid)
  .done(function(battles){
    return res.send(battles); 
  })
  .fail(function(err){
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
    return res.send(doc); 
  })
  .fail(function(err){
    return res.send(null);
  });
}