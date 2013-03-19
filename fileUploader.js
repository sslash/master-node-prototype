var fs    = require('fs');
var path  = require("path");
var $     = require('jquery');



exports.uploadFile = function(args){
  var dfr = $.Deferred();
  console.log("FILE: " + JSON.stringify(args.file));

  // get the temporary location of the file
  var tmp_path = "./" + args.file.path;
  console.log("Tmp path is: " + tmp_path);
  // set where the file should actually exists - in this case it is in the "images" directory
  
  var target_path = args.path + args.filename;
  console.log("Will save file to: " + target_path);
   // move the file from the temporary location to the intended location
  fs.rename(tmp_path, target_path, function(err) {
    if (err) {
      console.log("Error saving file! " + JSON.stringify(err));
      throw err;
    }
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
          if (err) {
            //throw err;
            dfr.reject(err);
          }else{
          //res.send('File uploaded to: ' + target_path + ' - ' + req.files.file.size + ' bytes');
            dfr.resolve({
              file : args.file
            })
          }
        });
  });

  return dfr.promise();
}