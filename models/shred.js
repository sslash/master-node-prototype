var mongoose	  = mongoose || require('mongoose');
var schema		  = mongoose.Schema;
var shredder    = require('./shredder');
var dbTemplate  = require('../controllers/dbTemplate');
$               = require('jquery');
_               = require('underscore')._;

var Shred = mongoose.model('shred', new mongoose.Schema({
  //_id : schema.Types.ObjectId,
  description: String,
  videoPath: String,
  owner : {
    _id : schema.Types.ObjectId,
    username : String,
    imgPath : String
  },
  videoThumbnail : String,
  shredComments: Array,
  shredRating: {
    numberOfRaters : Number,
    currentRating : Number
  },
  timeCreated : Date,
  tags : Array
}),'shred');



exports.save = function(attrs) {
	var dfr = $.Deferred();
 var shred = new Shred(attrs);

 shred.save(function(err, doc) {
   if (!err) {
    dfr.resolve(doc);
  } else {
    dfr.reject(err);
  }
});
 return dfr.promise();
}

// Update the whole thing.
// Should support more finer grained updates
exports.updateShred = function(args){
   var dfr = $.Deferred();
  Shred.findOneAndUpdate(
    {"_id" : args.uid.toString()},
    args.shred
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

exports.updateShredWithVideo = function(args){
   var dfr = $.Deferred();
  Shred.findOneAndUpdate(
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

exports.getShredsByShredder = function(attr) {
  var dfr = $.Deferred();
  Shred.find({"owner._id" : attr.uid.toString()})
    .limit(attr.offset)
    .skip(attr.page*attr.offset)
    .sort('-timeCreated')
    .exec(function(e,d){dbTemplate.callback(e,d,dfr);});

  return dfr.promise();


}


/**************************************
*             VERB FUNCTIONS          *
***************************************/


exports.getShredsByRating = function(page, offset) {
  var dfr = $.Deferred();
  Shred.find()
  .sort('-shredRating.currentRating')
  .limit(offset)
  .skip(page)
  .exec(function( err, shreds ) {
    if( !err ) {
      dfr.resolve( shreds );
    } else {
      dfr.reject(err);
    }
  });

  return dfr.promise();
}

exports.getFaneesForShredder = function(uid) {
  var dfr = $.Deferred();

  if ( uid) {
    shredder.Shredder.findById(uid, "fanees._id")
    .exec()
    .addCallback(function(doc){

      if ( doc.get('fanees') ){
        var oldf = doc.get('fanees');
        var f = [];
        for ( var i = 0; i < oldf.length; i++ ){
           f.push(mongoose.Types.ObjectId(oldf[i]._id.toString()));
        }
        dfr.resolve( f );
      } else {
        dfr.reject( "No fanees" );
      }
      });
    } 
  return dfr.promise();
}

exports.getFaneesForShredderNotInObj = function(uid, obj) {
  var dfr = $.Deferred();
  shredder.Shredder.findById(uid, "fanees._id")
  .exec()
  .addCallback(function(doc){

    if ( doc.get('fanees') ){
      var oldf = doc.get('fanees');
      $.map( oldf, function(value, key) {
        var oid = mongoose.Types.ObjectId(value._id.toString());
        obj[oid] = 1;
      });

      $.map(obj, function(value, key) {
       // console.log("FANFAN: " + value + " " + key );
     });
      dfr.resolve( obj );
    } else{
      dfr.reject( "No fanees" );
    }
  });
  return dfr.promise();
}

exports.getNewShredsFromFanees = function(args) {
  var dfr = $.Deferred();
  exports.getFaneesForShredder(args.uid)
  .done(function(f){
    Shred.find({"owner._id" : {$in: f} })
    .limit(args.offset)
    .skip(args.page*args.offset)
    .sort('-timeCreated')
    .exec(function(err,shreds) {
      if( !err ) {
        dfr.resolve( shreds );
      } else {
        dfr.reject(err);
      }
    });   
  });

  return dfr.promise();
}


exports.getShredsYouMightKnow = function(args) {
  var dfr = $.Deferred();
  var faneesArr = [];
  exports.getFaneesForShredder(args.uid)
  .done(function(f){
    var len = f.length;
    var count = 0;

    // For Shredders fanees
    for ( i in f ) {

      // get all his fanees
      exports.getFaneesForShredder(f[i])
      .done(function(res) {        
        faneesArr = _.union(res, faneesArr);
        count ++;

          // When all fanees.fanees are in the object
          // Find shreds!
        if (len == count){
      
          // There are possibly duplicates in the array
          // If shredders have duplicate fanees. 
          var self = mongoose.Types.ObjectId(args.uid);
          Shred.find({"owner._id": {$in : _.without(faneesArr, args.uid)}})
            .where("owner._id").ne(self)
            .sort('-timeCreated')
            .limit(args.offset)
            .skip(args.page*args.offset)
            .exec(function(e,d){
              dbTemplate.callback(e,d,dfr)}); 
        }
      })
    }
  });
  
  return dfr.promise();
}

exports.getShredsByTags = function(args){
 var dfr = $.Deferred();
 var queryParams = {};

 if ( args.extras ) {
  var arr = [];
  if ( typeof(args.extras.tags) == 'object') {
    $.map(args.extras.tags, function(val,i) {
      arr.push(val);
    })
  }else{
    arr.push(args.extras.tags)
  }

 Shred.find({"tags" : {$in : arr} })
  .sort('-timeCreated')
  .limit(args.offset)
  .skip(args.page*args.offset)
  .exec(function(e,d){ dbTemplate.callback(e,d,dfr)}); 

 } else {
  Shred.find({})
  .sort('-timeCreated')
  .limit(args.offset)
  .skip(args.page*args.offset)
  .exec(function(e,d){dbTemplate.callback(e,d,dfr)}); }
  return dfr.promise();
}


