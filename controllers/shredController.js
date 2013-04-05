var shred       = require('../models/shred'),
dbTemplate      =  require('./dbTemplate'),
fileUploader    = require('../fileUploader'),
$               = require('jquery');

exports.createShred = function(req, res) {
  if ( !req.body){
    res.statusCode = 400;
    return res.send(null);
  }

  shred.save(req.body)
  .done(function(doc) {
    res.send(doc);
  })
  .fail(function(err) {
    res.send(null);
  });
}

exports.deleteComment = function(req, res) {
  if ( !req.params.shredid || !req.params.index) {
    res.statusCode = 400;
    return res.send(null);
  }


  return dbTemplate.doCall(
      shredder.deleteComment, {
        shredId: req.params.shredid,
        index:req.params.shredid,
        res:res
       });
}

exports.updateShred = function(req,res) {
   if ( !req.body ) {
    res.statusCode = 400;
    return res.send(null);
  }

  var shredData = req.body;
  delete shredData._id;

  shred.updateShred({
      uid : req.params.uid,
      shred: shredData
    })
    .done(function(doc){
      res.send(doc);
    })
    .fail(function(err){
      res.send(null);
    })
  .fail(function(err){
    res.send(null);
  })
}

exports.updateShredVithVideo = function(req, res, next) {
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

    shred.updateShredWithVideo({
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

exports.getShredsByShredder = function(req, res) {
  return dbTemplate.callDb({
    callback: shred.getShredsByShredder,
      req: req,
      res: res,
      msg: "getShredsByShredder"
  })
}

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
    return res.send(null);
  });
}

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
