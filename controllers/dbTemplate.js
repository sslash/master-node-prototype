// Called by controllers
exports.callDb = function(obj) {
	if (!obj.req.query.page || !obj.req.query.offset || !obj.req.params.uid) {
    	obj.res.statusCode = 404;
    	return obj.res.send(null);
  	}
    
  	obj.callback(
      {
        page: obj.req.query.page-1,
        offset: obj.req.query.offset,
        uid: obj.req.params.uid,
        extras : obj.extras
      })
  	 .done(function(doc){
  	 	if ( obj.msg ) {
  	 	//	console.log(obj.msg + ": Res size = " + doc.length);
  	 	}
    	return obj.res.send(doc); 
  	})
  	.fail(function(err){
  		if ( obj.msg ) {
  	 		//console.log(obj.msg + ": failed: " + JSON.stringify(err));
  	 	}
    	return obj.res.send(null);
  	})
}

exports.callDbNoUID = function(obj) {
  if (!obj.req.query.page || !obj.req.query.offset) {
      obj.res.statusCode = 404;
      return obj.res.send(null);
    }
    
    obj.callback(
      {
        page: obj.req.query.page-1,
        offset: obj.req.query.offset,
        extras : obj.extras
      })
     .done(function(doc){
      if ( obj.msg ) {
       // console.log(obj.msg + ": Res size = " + doc.length);
      }
      return obj.res.send(doc); 
    })
    .fail(function(err){
      if ( obj.msg ) {
       // console.log(obj.msg + ": failed: " + JSON.stringify(err));
      }
      return obj.res.send(null);
    })
}


// Called by models
exports.callback = function(err,doc,dfr) {
  if( !err ) {
    dfr.resolve( doc );
  } else {
    dfr.reject(err);
  }
}