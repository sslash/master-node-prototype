exports.callDb = function(obj) {
	if (!obj.req.query.page || !obj.req.query.offset || !obj.req.params.uid) {
    	obj.res.statusCode = 404;
    	return obj.res.send(null);
  	}
    
    exports.doCall(obj.callback, {
     page: obj.req.query.page-1,
        offset: obj.req.query.offset,
        uid: obj.req.params.uid,
        extras : obj.extras,
        res: obj.res
    });
}

exports.callDbNoUID = function(obj) {
  if (!obj.req.query.page || !obj.req.query.offset) {
      obj.res.statusCode = 404;
      return obj.res.send(null);
    }
    exports.doCall(obj.callback, {
      page: obj.req.query.page-1,
      offset: obj.req.query.offset,
      extras : obj.extras,
      res : obj.res
    });
}

exports.doCall = function(callback, argObject) {
   callback(argObject)
     .done(function(doc){
      return argObject.res.send(doc); 
    })
    .fail(function(err){
      return argObject.res.send(null);
    })
}

exports.callback = function(err,doc,dfr) {
  if( !err ) {
    dfr.resolve( doc );
  } else {
    dfr.reject(err);
  }
}