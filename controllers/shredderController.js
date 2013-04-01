var shredder  	= require('../models/shredder'),
dbTemplate	 	= require('./dbTemplate'),
$             	= require('jquery');


/**
* Get a shredder by the given id
*/
exports.getShredderById = function(shredderId, res) {
  shredder.getShredderById(shredderId)
  .done(function(doc) {
    res.send(doc);
  })
  .fail(function(err) {
    //console.log("get shredder failed: " + JSON.stringify(err));
    res.send(null);
  });
}

exports.digGuitar = function(req,res) {
    if ( !req.params.uid || !req.params.gIndex) {
      res.statusCode = 400;
      return res.send(null);
    }
    shredder.addDigForGuitar(req.params.uid, req.params.gIndex)
    .done(function(doc){
      res.send(doc);
    })
    .fail(function() {
      res.send(null);
    })
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

/* Shredhub 1.0 API */

exports.apiGetShredderById = function(req,res) {
  if ( !req.params.uid ) {
    res.statusCode = 400;
    return res.send(null);
  }

  shredder.getShredderById(req.params.uid, req.query.withShreds)
  .done(function(doc){
    res.send(doc);
  })
  .fail(function() {
    res.send(null);
  })
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
