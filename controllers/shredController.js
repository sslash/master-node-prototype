var shred       = require('../models/shred'),
dbTemplate      =  require('./dbTemplate'),
fileUploader    = require('../fileUploader'),
$               = require('jquery');


/**
* POST  /api/shreds/
*
* Save a new shred to the database. Saves only
* The metadata about the shred, not the video or anything..
*/
exports.createShred = function(req, res) {
  if ( !req.body){
    res.statusCode = 400;
    return res.send(null);
  }

  shred.save(req.body)
  .done(function(doc) {
    console.log("Shred created: " + JSON.stringify(doc));
    res.send(doc);
  })
  .fail(function(err) {
    console.log("createShred() failed: " + JSON.stringify(err));
    res.send(null);
  });
}

exports.updateShred = function(req,res) {
   if ( !req.body ) {
    res.statusCode = 400;
    return res.send(null);
  }

  var shredData = req.body;
  delete shredData._id;

  console.log("Shred data: " + JSON.stringify(shredData));
  shred.updateShred({
      uid : req.params.uid,
      shred: shredData
    })
    .done(function(doc){
      console.log("Shred updated: " + JSON.stringify(doc));
      res.send(doc);
    })
    .fail(function(err){
      console.log("Shred updated failed " + err);
      res.send(null);
    })
  .fail(function(err){
    console.log("saved file failed:" + err);
    res.send(null);
  })
}

exports.updateShredVithVideo = function(req, res, next) {
  if ( !req.body  || !req.files.file || !req.params.uid) {
    res.statusCode = 400;
    return res.send(null);
  }
  console.log("Shred req file: " + req.files.file);

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

    shred.updateShredWithVideo({
      uid : req.params.uid,
      videoPath : file.file.name
    })
    .done(function(doc){
      console.log("Shred updated: " + JSON.stringify(doc));
      res.send(doc);
    })
    .fail(function(err){
      console.log("Shred updated failed " + err);
      res.send(null);
    })
  })
  .fail(function(err){
    console.log("saved file failed:" + err);
    res.send(null);
  })
}


exports.getShredsByShredder = function(req, res) {
  return dbTemplate.callDb({
    callback: shred.getShredsByShredder,
      req: req,
      res: res,
      msg: "getShredsByShredder"
  })
}


/**
* GET /api/shreds/bestRated?page=p&offset=o'
*
* Gets all shreds ordered by rating
*/
exports.getShredsByRating = function(req, res) {
  if (!req.query.page || !req.query.offset) {
    res.statusCode = 400;
    return res.send(null);
  }  
  return shred.getShredsByRating(req.query.page-1, req.query.offset)
  .done(function(shreds){
    return res.send(shreds); 
  })
  .fail(function(err){
    console.log("find() - fail: " + JSON.stringify(err));
    return res.send(null);
  });
}


/* Shredhub 1.0 API */


/**
* GET NewShredsFromFanees/:uid?page=p&offset=o
*
* Gets all shreds ordered by rating
*/
exports.getNewShredsFromFanees = function(req,res) {
  return dbTemplate.callDb(
    {
      callback: shred.getNewShredsFromFanees,
      req: req,
      res: res,
      msg: "getNewShredsFromFanees"
    });
}

exports.getShredsYouMightKnow = function(req, res) {
  dbTemplate.callDb({
    callback : shred.getShredsYouMightKnow,
    req: req,
    res: res,
    msg: "getShredsYouMightKnow"
  });
}

exports.getShredsByTags = function(req,res){
  args = {
      callback: shred.getShredsByTags,
      req: req,
      res: res,
      msg: "getShredsByTags"
    }

    if ( req.param('tag') ){
      args.extras = {
        tags : req.param('tag')
      }
    }
  return dbTemplate.callDb(args);
}
