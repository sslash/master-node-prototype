  var shredder  	= require('../models/shredder'),
dbTemplate	 	= require('./dbTemplate'),
$             	= require('jquery');

exports.getShredderById = function(shredderId, res) {
  return dbTemplate.doCall(
      shredder.getShredderById, {
        uid: shredderId,
        res : res
      });
}

exports.digGuitar = function(req,res) {
    if ( !req.params.uid || !req.params.gIndex) {
      res.statusCode = 400;
      return res.send(null);
   }

    return dbTemplate.doCall(
      shredder.addDigForGuitar, {
        uid: req.params.uid, 
        gIndex : req.params.gIndex,
        res : res
      });
}

exports.addFaneeForShredderWithId = function(req,res) {
   if ( !req.params.uid || !req.body) {
    res.statusCode = 400;
    return res.send(null);
  }

  shredder.addFaneeForShredderWithId(req.params.uid, req.body)
  .done(function(doc){
    res.send(doc);
  })
  .fail(function() {
    res.send(null);
  })

}

exports.getAllShreddersByTimeCreated = function(req,res) {
  return dbTemplate.callDbNoUID({
      callback: shredder.getAllShreddersByTimeCreated,
      req: req,
      res: res,
      msg: "getAllShreddersByTimeCreated"
  });
}

exports.apiGetShredderById = function(req,res) {
  if ( !req.params.uid ) {
    res.statusCode = 400;
    return res.send(null);
  }

  return dbTemplate.doCall(
      shredder.getShredderById, {
        uid: req.params.uid,
        withShreds:req.query.withShreds,
        res:res
       });
}

exports.updateShredder = function(req,res) {
   if ( !req.params.uid || !req.body) {
    res.statusCode = 400;
    return res.send(null);
  }

  shredder.updateShredder(req.params.uid, req.body)
  .done(function(doc){
    res.send(doc);
  })
  .fail(function() {
    res.send(null);
  })

}

exports.getShreddersShredderMightLike = function(req, res) {
	return dbTemplate.callDb({
		  callback: shredder.getShreddersShredderMightLike,
			req: req,
			res: res,
			msg: "getShreddersShredderMightLike"
	});
}
