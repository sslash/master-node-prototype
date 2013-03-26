this["JST"] = this["JST"] || {};

this["JST"]["app/templates/Battle.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='';
}
return __p;
};

this["JST"]["app/templates/BattleRequest.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='';
}
return __p;
};

this["JST"]["app/templates/Home.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<!-- Big carusell -->\n<div id="myCarousel" class="carousel slide">\n\t<!-- Carousel items -->\n\t<div class="carousel-inner">\n\n\t\t<div class="item active">\n\t\t\t<img src="/pics/John_Petrucci.jpg" width="100%" />\n\t\t\t<div class="container">\n\t\t\t\t<div class="carousel-caption">\n\t\t\t\t\t<h1>Share your shred vidz</h1>\n\t\t\t\t\t<p class="lead">Record and upload a video of you shredding away\n\t\t\t\t\t\ta blasting guitar lick. Get it rated by other shredders and add\n\t\t\t\t\t\tone or more tags to it, so others will see it in their shred pool.</p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="item">\n\t\t\t<img src="/pics/slash.jpg" width="100%" />\n\t\t\t<div class="container">\n\t\t\t\t<div class="carousel-caption">\n\t\t\t\t\t<h1>Watch your favorite shredder</h1>\n\t\t\t\t\t<p class="lead">You get a shred pool that contains the latest\n\t\t\t\t\t\tshred videos from all of your favorite shredders. You can also get\n\t\t\t\t\t\trecommended shreds based on your interests.</p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="item">\n\t\t\t<img src="/pics/morse.jpg" width="100%" />\n\t\t\t<div class="container">\n\t\t\t\t<div class="carousel-caption">\n\t\t\t\t\t<h1>Battle against another shredder</h1>\n\t\t\t\t\t<p class="lead">Challenge a shredder to a unique guitar battle.\n\t\t\t\t\t\tLet other shredders watch and rate your performance, and you will\n\t\t\t\t\t\tearn experience points. Points will help you level up to\n\t\t\t\t\t\teventually become a shred master!</p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="item">\n\t\t\t<img src="/pics/stevelukather.jpg" width="100%" />\n\t\t\t<div class="container">\n\t\t\t\t<div class="carousel-caption">\n\t\t\t\t\t<h1>Become the best shredder on Shredhub</h1>\n\t\t\t\t\t<p class="lead">Each time you post a shred or someone watches\n\t\t\t\t\t\tyour shreds you gain experience points. These will help you become\n\t\t\t\t\t\ta more attractive shredder so you\'ll eventually become famous and\n\t\t\t\t\t\tawesome.</p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<!-- Carousel nav -->\n\t<a class="carousel-control left" data-bypass="true" href="#myCarousel" data-slide="prev">&lsaquo;</a>\n\t<a class="carousel-control right" data-bypass="true" href="#myCarousel" data-slide="next">&rsaquo;</a>\n</div>\n\n\n\n<!-- <div class="row" id="addnewbutton">\n\t<div class="span2"></div>\n\t<div class="span10">\n\t\t<button class="btn btn-info" id="new">Add new</button>\n\t</div>\n</div>\n  -->\n\n<!--  Hidden add modal -->\n<div class="modal hide fade" id="myModal" tabindex="-1" role="dialog"\n\taria-labelledby="myModalLabel">\n\t<div class="modal-header">\n\t\t<button type="button" class="close" data-dismiss="modal"\n\t\t\taria-hidden="true">x</button>\n\t\t<h3 id="myModalLabel">Modal header</h3>\n\t</div>\n\n\t<div class="modal-body">\n\t\t<div class="form-horizontal">\n\t\t\t<div class="control-group">\n\t\t\t\t<label class="control-label" for="inputName">Name</label>\n\t\t\t\t<div class="controls">\n\t\t\t\t\t<input type="text" id="inputName" placeholder="Name">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="control-group">\n\t\t\t\t<label class="control-label" for="inputUrl">Url</label>\n\t\t\t\t<div class="controls">\n\t\t\t\t\t<input type="text" id="inputUrl" placeholder="Url">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class="modal-footer">\n\t\t<button class="btn" id="close">Close</button>\n\t\t<button class="btn btn-primary" id="save">Save</button>\n\t</div>\n</div>\n\n\n<div class="container">\n\t<div class="marketing">\n\t\t<h1>Shredhub</h1>\n\t\t<p class="marketing-byline">Welcome to Shredhub. Take a look at\n\t\t\tthe current top shreds</p>\n\n\t\t<div id="shredModalDiv"></div>\n\t\t<div id="shredsListDiv"></div>\t\n\n\t\t\n\t\t\n\t</div>\n</div>\n';
}
return __p;
};

this["JST"]["app/templates/main/Home.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<!-- Big carusell -->\n<div id="myCarousel" class="carousel slide">\n\t<!-- Carousel items -->\n\t<div class="carousel-inner">\n\n\t\t<div class="item active">\n\t\t\t<img src="/pics/John_Petrucci.jpg" width="100%" />\n\t\t\t<div class="container">\n\t\t\t\t<div class="carousel-caption">\n\t\t\t\t\t<h1>Share your shred vidz</h1>\n\t\t\t\t\t<p class="lead">Record and upload a video of you shredding away\n\t\t\t\t\t\ta blasting guitar lick. Get it rated by other shredders and add\n\t\t\t\t\t\tone or more tags to it, so others will see it in their shred pool.</p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="item">\n\t\t\t<img src="/pics/slash.jpg" width="100%" />\n\t\t\t<div class="container">\n\t\t\t\t<div class="carousel-caption">\n\t\t\t\t\t<h1>Watch your favorite shredder</h1>\n\t\t\t\t\t<p class="lead">You get a shred pool that contains the latest\n\t\t\t\t\t\tshred videos from all of your favorite shredders. You can also get\n\t\t\t\t\t\trecommended shreds based on your interests.</p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="item">\n\t\t\t<img src="/pics/morse.jpg" width="100%" />\n\t\t\t<div class="container">\n\t\t\t\t<div class="carousel-caption">\n\t\t\t\t\t<h1>Battle against another shredder</h1>\n\t\t\t\t\t<p class="lead">Challenge a shredder to a unique guitar battle.\n\t\t\t\t\t\tLet other shredders watch and rate your performance, and you will\n\t\t\t\t\t\tearn experience points. Points will help you level up to\n\t\t\t\t\t\teventually become a shred master!</p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="item">\n\t\t\t<img src="/pics/stevelukather.jpg" width="100%" />\n\t\t\t<div class="container">\n\t\t\t\t<div class="carousel-caption">\n\t\t\t\t\t<h1>Become the best shredder on Shredhub</h1>\n\t\t\t\t\t<p class="lead">Each time you post a shred or someone watches\n\t\t\t\t\t\tyour shreds you gain experience points. These will help you become\n\t\t\t\t\t\ta more attractive shredder so you\'ll eventually become famous and\n\t\t\t\t\t\tawesome.</p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<!-- Carousel nav -->\n\t<a class="carousel-control left" data-bypass="true" href="#myCarousel" data-slide="prev">&lsaquo;</a>\n\t<a class="carousel-control right" data-bypass="true" href="#myCarousel" data-slide="next">&rsaquo;</a>\n</div>\n\n\n\n<!-- <div class="row" id="addnewbutton">\n\t<div class="span2"></div>\n\t<div class="span10">\n\t\t<button class="btn btn-info" id="new">Add new</button>\n\t</div>\n</div>\n  -->\n\n<!--  Hidden add modal -->\n<div class="modal hide fade" id="myModal" tabindex="-1" role="dialog"\n\taria-labelledby="myModalLabel">\n\t<div class="modal-header">\n\t\t<button type="button" class="close" data-dismiss="modal"\n\t\t\taria-hidden="true">x</button>\n\t\t<h3 id="myModalLabel">Modal header</h3>\n\t</div>\n\n\t<div class="modal-body">\n\t\t<div class="form-horizontal">\n\t\t\t<div class="control-group">\n\t\t\t\t<label class="control-label" for="inputName">Name</label>\n\t\t\t\t<div class="controls">\n\t\t\t\t\t<input type="text" id="inputName" placeholder="Name">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="control-group">\n\t\t\t\t<label class="control-label" for="inputUrl">Url</label>\n\t\t\t\t<div class="controls">\n\t\t\t\t\t<input type="text" id="inputUrl" placeholder="Url">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class="modal-footer">\n\t\t<button class="btn" id="close">Close</button>\n\t\t<button class="btn btn-primary" id="save">Save</button>\n\t</div>\n</div>\n\n\n<div class="container">\n\t<div class="marketing">\n\t\t<h1>Shredhub</h1>\n\t\t<p class="marketing-byline">Welcome to Shredhub. Take a look at\n\t\t\tthe current top shreds</p>\n\n\t\t<div id="shredModalDiv"></div>\n\t\t<div id="shredsListDiv"></div>\t\n\n\t\t\n\t\t\n\t</div>\n</div>\n';
}
return __p;
};

this["JST"]["app/templates/main/NavbarLoggedIn.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<!-- Navbar \n    ================================================== -->\n<div id="navbar-mid" class="navbar navbar-inverse navbar-fixed-top">\n\t<div class="navbar-inner">\n\t\t<div class="container">\n\t\t\t<button type="button" class="btn btn-navbar" data-toggle="collapse"\n\t\t\t\tdata-target=".nav-collapse">\n\t\t\t\t<span class="icon-bar"></span> <span class="icon-bar"></span> <span\n\t\t\t\t\tclass="icon-bar"></span>\n\t\t\t</button>\n\t\t\t<a class="brand" href="#">Shredhub</a>\n\t\t\t<div class="nav-collapse collapse">\n\t\t\t\t<ul class="nav">\n\t\t\t\t\t<li class=""><a href="#shredPool">The Shred pool</a></li>\n\t\t\t\t\t<li class=""><a href="/shredder/'+
(user._id )+
'">Profile</a>\n\t\t\t\t\t<li class=""><a href="#battles">Battles</a></li>\n\t\t\t\t\t<li class=""><a href="/shredders">Shredders</a></li>\n\t\t\t\t\t<li class=""><a href="#About">About</a></li>\n\t\t\t\t\t<li class=""><a href="Contact">Contact</a></li>\n\n\t\t\t\t\t<li class="">\n\t\t\t\t\t\t<p class="navbar-text pull-right">\n\t\t\t\t\t\t\tLogged in as <a href="#" class="navbar-link"> '+
( user.username )+
'\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t<!--/.nav-collapse -->\n\t\t\t\t\t</li>\n\t\t\t\t\t<li class="">\n\t\t\t\t\t\t<div class="btn-group">\n\t\t\t\t\t\t\t<a class="btn btn-info dropdown-toggle" data-bypass="true" data-toggle="dropdown"\n\t\t\t\t\t\t\t\thref=""> Battle Requests! <span class="caret"></span>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t<ul class="dropdown-menu"> \n\t\t\t\t\t\t\t\t';
 _.each ( battleRequests, function(b) { 
;__p+='\n\t\t\t\t\t\t\t\t\t<li> <p>'+
( b.battler.username )+
'</p><a class="battleRequestModal" id = "'+
( b._id )+
'" data-bypass="true" href="#">Accept</a> </li>  \n\t\t\t\t\t\t\t\t';
 }) 
;__p+='\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li class="">\n\t\t\t\t\t\t<div class="btn-group">\n\t\t\t\t\t\t\t<a class="btn btn-info dropdown-toggle" data-bypass="true" data-toggle="dropdown"\n\t\t\t\t\t\t\t\thref="#">You\'re Fanees<span class="caret"></span>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t<ul class="dropdown-menu">\n\t\t\t\t\t\t\t\t';
 _.each ( user.fanees, function(f) { 
;__p+='\n\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t<a href="/shredder/'+
(f._id )+
'">'+
( f.username )+
'</a>\n\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t';
 }) 
;__p+='\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n';
}
return __p;
};

this["JST"]["app/templates/main/NavbarNotLoggedIn.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<!-- Navbar \n    ================================================== -->\n    <div id="navbar-mid" class="navbar navbar-inverse navbar-fixed-top">\n      <div class="navbar-inner">\n        <div class="container">\n          <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">\n            <span class="icon-bar"></span>\n            <span class="icon-bar"></span>\n            <span class="icon-bar"></span>\n          </button>\n          <a class="brand" href="#">Shredhub</a>\n          <div class="nav-collapse collapse">\n            <ul class="nav">\n              <li class="">\n                <a href="#shredPool">The Shred pool</a>\n              </li> \n              <li class="">\n                <!-- TODO: change to window.user.username -->\n              </li>\n              <li class="">\n                <a href="battles">Battles</a>\n              </li>\n              <li class="">\n                <a href="shredders">Shredders</a>\n              </li>\n              <li class="">\n                <a href="#About">About</a>\n              </li>\n              <li class="">\n                <a href="Contact">Contact</a>\n              </li>           \n              <li class=""> \n\t\t\t\t  <p class="navbar-text pull-right">\n\t\t\t\t\t <a href="#signInModal" role="button" data-bypass="true"\n\t\t\t\t\t\tclass="navbar-link" data-keyboard="true" data-toggle="modal"\n\t\t\t\t\t\tdata-backdrop="true" data-target="#signInModal">Sign in</a> \n              </li>\n            </ul>\n          </div>\n        </div>\n      </div> \n    </div> \n\n<!-- Sign in Modal -->\n<div class="modal hide fade in" id="signInModal" tabindex="-1" role="dialog" \naria-labelledby="myModalLabel" aria-hidden="true">\n\t<div class="modal-header">\n\t\t<button type="button" class="close" data-dismiss="modal"\n\t\t\taria-hidden="true">x</button>\n\t\t<h3 id="myModalLabel">Sign in</h3> \n\t\t<p id="loginError" class="text-error"></p>\n\t</div>\n\n\t<!-- FORM INPUT -->\n\t<div class="modal-body form-inline">\n\t\t<div class="control-group">\n\n\t\t\t<input type="text" class="input-small" placeholder="Username"\n\t\t\t\tname="j_username" id="username">\n\t\t\t<input type="password" class="input-small" placeholder="Password" \n\t\t\tname="j_password" id="password">\n\t\t\t<label class="checkbox"> <input type="checkbox">\n\t\t\t\tRemember me\n\t\t\t</label> \n\t\t\t<button class = "btn" id="loginButton">Login</button>\t\t\t\n\t\t</div>\n\t</div>\n</div>';
}
return __p;
};

this["JST"]["app/templates/main/Scaffolding.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="leNavbar"></div>\n<!-- Inject stuff here! -->\n<div id="main-content"></div>\n';
}
return __p;
};

this["JST"]["app/templates/Scaffolding.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='\n\n<!-- Inject stuff here! -->\n<div id="main-content"></div>\n';
}
return __p;
};

this["JST"]["app/templates/shred/shredModal.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="modal hide fade videoView" id="playVideoModal" aria-hidden="true" tabindex="10" role="dialog"\n\taria-labelledby="myModalLabel">\n \n\t<div class="modal-header"> \n\t\t<button type="button" class="close" data-dismiss="modal" \n\t\t\taria-hidden="true">x</button>\n\n\t\t<h2>'+
( shred.description )+
'</h2>\n\t\t<h4>'+
( shred.owner.username )+
'</h4>\n\t</div>\n\n\t<div class="modal-body">\n\t\t<!-- video.js -->\n\n\t\t<video id="videoInModal" class="video-js vjs-default-skin" controls\n\t\t\tpreload="auto" width="640">\n\t\t\t<source src="/vidz/'+
(shred.videoPath )+
'"\n\t\t\t\ttype=\'video/mp4\'>\n\t\t</video>\n\t</div>  \n \n\t<div class="modal-footer">\n\t\t<div class="row-fluid"> \n\t\t\t<div class="span6">\n\t\t\t\t<p >\n\t\t\t\t\t<small> Created at: '+
( new Date(shred.timeCreated).toUTCString() )+
' </small> \n\t\t\t\t</p>  \n\t\t\t\t<p class="lead">Number of raters:  '+
( shred.shredRating.numberOfRaters )+
'</p> \n\t\t\t\t<p class="lead">Rating: \n\t\t\t\t\t';
 if (shred.shredRating.currentRating > 0) { 
;__p+='\n\t\t\t\t\t'+
( shred.shredRating.currentRating / shred.shredRating.numberOfRaters )+
' \n\t\t\t\t\t';
 } else { 
;__p+='\n\t\t\t\t\t'+
( 0 )+
' \n\t\t\t\t\t';
 } 
;__p+='\t\t\t\t \n\t\t\t\t</p>\t\n\t\t\t\t\n\t\t\t\t<p class="small">\n\t\t\t\t\tRate it: <input type="range" min="0" max="10" name="rating"\n\t\t\t\t\t\tvalue="5">\n\t\t\t\t\t<button id="rateButton" class="btn btn-small btn-primary">\\m/</button>\n\t\t\t\t</p>\n\t\t\t\t\t<input id="commentText" type="text" name=text\n\t\t\t\t\t\tplaceholder="Leave a comment!">\n\t\t\t\t\t<button id="commentButton" class="btn btn-small btn-primary">Submit</button>  \n\t\t\t</div> \n \n\t\t\t<div class="span6">\n\t\t\t\t<p class="lead">Comments</p>\n\t\t\t\t<table class="table table-condensed">\t\t\t\t\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<th>Text</th>\n\t\t\t\t\t\t<th>By</th>\n\t\t\t\t\t\t<th>At</th>\n\t\t\t\t\t</tr>\n\t\t\t\t\t\n\t\t\t\t';
_.each(shred.shredComments,function(comment, i){
;__p+='\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<td>'+
( comment.text )+
'</td>\n\t\t\t\t\t\t\t<td><a href="/shredder/'+
( comment.commenterId )+
'">'+
( comment.commenterName )+
'</a></td>\n\t\t\t\t\t\t\t<td>'+
( new Date(comment.timeCreated).toUTCString() )+
'</td>\n\t\t\t\t\t\t\t<td><button type="button" class="close" id="del-'+
( i )+
'" >x</button></td>\n\t\t\t\t\t\t</tr>\t\t\t\n\t\t\t\t\t';
});
;__p+='  \n\t\t\t\t</table>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n\n\n';
}
return __p;
};

this["JST"]["app/templates/Shred.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="span4">\n\t<a href="#" id="shredThumb_'+
( index )+
'" data-bypass="true" class="shredVideoThumb"> <img class="imageClipped"\n\t\tsrc="/vidz/'+
( shred.videoThumbnail )+
'" />\n\t</a>\n\t<p class="lead">'+
( shred.description )+
'</p>\n\t<a href="/shredder/'+
( shred.owner._id )+
'">'+
( shred.owner.username )+
'</a>\n</div>';
}
return __p;
};

this["JST"]["app/templates/shredder/brPending.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='\n<h2>'+
( shredder.username )+
' wants to battle you!</h2>\n</br> \n<button id="checkBattleRequestButton" class="btn btn-info">Check it out</button> \n\n\n<div class="modal hide fade videoView" id="battleRequestModal" aria-hidden="true" tabindex="10" role="dialog"\n\taria-labelledby="myModalLabel">\n\t<div class="modal-header">\n\t\t<button type="button" class="close" data-dismiss="modal"\n\t\t\taria-hidden="true">x</button>\n\t\t<h3 id="myModalLabel">Batle request</h3> \n\t\t<p id="loginError" class="text-error"></p>\n\t</div>\n\n\t<!-- FORM INPUT -->\n\t<div class="modal-body">\n\t\t<h4 class="lead">'+
( shredder.username )+
' says:</h4> \n\t\t<p> '+
( model.battleStyle)+
' </p>\n\t\t\n\t\t<video id="videoInModal" class="video-js vjs-default-skin" controls\n\t\t\tpreload="auto" width="640">\n\t\t\t<source src="/vidz/'+
(model.videoPath )+
'"\n\t\t\t\ttype=\'video/mp4\'>\n  \t\t\t<source src="/vidz/'+
(model.videoPath )+
'"\n\t\t\t\t\ttype=\'video/webm\'>\t\t\n\t\t</video>\n\t\t\n\t\t<p> Created at: '+
( model.timeCreated )+
' </p>\n\t\t</div>\n\t\t<div class="modal-footer">\n\t\t<button id="acceptBattle" data-dismiss="modal" class="btn btn-success">Accept!</button>\n\t</div>\n</div>\n';
}
return __p;
};

this["JST"]["app/templates/shredder/brSent.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<h2>A battle request has been sent to '+
( username )+
'  </h2>';
}
return __p;
};

this["JST"]["app/templates/shredder/challengeToBattle.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<h2>Challenge '+
( username )+
' to a battle</h2> \n<button class="btn btn-success" id="challengeToBattleButton">Battle</button> \n\n<div class="modal hide fade videoView" backdrop="true"\n\tid="challengeToBattleModal" aria-hidden="true" tabindex="-1"\n\trole="dialog" aria-labelledby="myModalLabel">\n\n\t<div class="modal-header">\n\t\t<button type="button" class="close" data-dismiss="modal"\n\t\t\taria-hidden="true">x</button>\n\n\t\t<h2>Battle</h2>\n\t\t<p class="lead">\n\t\t\tAdd a opening shred against '+
(	username )+
' \n\t\t</p> \n\t</div>\n\n\t<div class="modal-body">\n\t\t<div class="control-group">\n\n\t\t\t\t<div class="control-group">\n\t\t\t\t\t<label class="control-label">Set battle style</label>\n\t\t\t\t\t<div class="controls">\n\n\t\t\t\t\t\t<select class="input-large" id="battleStyle">\n\t\t\t\t\t\t\t<option>Bet you can\'t shred this</option>\n\t\t\t\t\t\t\t<option>Shred something better in the same key</option>\n\t\t\t\t\t\t\t<option>Shred something better using this scale</option>\n\t\t\t\t\t\t\t<option>Shred faster then this</option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t\t<!-- Image upload -->\n\t\t\t<form enctype="multipart/form-data" id="addBattleRequestForm">\n\n\n\t\t\t\t<!-- Shred video -->\n\t\t\t\t<div class="control-group">\n\t\t\t\t\t<label class="control-label" for="shredVideo">Shred video</label>\n\n\t\t\t\t\t<div class="controls">\n\t\t\t\t\t\t<input name="file" type="file" />\n\t\t\t\t\t</div>\n\t\t\t\t</div> \n\n\t\t\t\t<div class="modal-footer">\n\t\t\t\t\t<button class="btn btn-primary" id="addBattleShredButton">I\'m ready!</button>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t</div>\n\t</div>\n\n\n</div>\n\n\n';
}
return __p;
};

this["JST"]["app/templates/shredder/inBattle.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<h2>You\'re in a battle against '+
( shredderUsername )+
' </h2>\n</br> \n<a href="/battles/'+
( battleId )+
'" class="btn btn-info">Go to battle</a>  ';
}
return __p;
};

this["JST"]["app/templates/shredder/Shredder.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="container">\n\t<div class="marketing">\n\t\t<h1>'+
( shredder.username )+
'</h1>\n\t\t<p class="marketing-byline">'+
( shredder.description )+
'</p>\n\n\t\t<div class="row-fluid">\n\n\t\t\t<div class="span6">\n\t\t\t\t<img alt="Profile image"\n\t\t\t\t\tsrc="/pics/profiles/'+
( shredder.profileImagePath )+
'"\n\t\t\t\t\twidth="300px" class="img-rounded" />\n\t\t\t</div>\n\t\t\t<div class="span6">\n\t\t\t\t<p>Level: '+
( shredder.levelLabel )+
' </p>\n\t\t\t\t<p>Experience points: '+
( shredder.shredderLevel  )+
' </p>\n\n\t\t\t\t<!-- FAN OR BECOME FAN -->\n\t\t\t\t';
 if ( renderFanBtn ) { 
;__p+='\n\t\t\t\t\t<button class="btn btn-success" id="becomeFanButton">Become a fan</button> \n\t\t\t\t';
 } 
;__p+='\n\t\t\t</div> \n\t\t</div>\n\n\t\t<hr class="soften">\n\t\t<h2>Shred specs</h2>\n\t\t</br>\n\n\t\t<div class="row-fluid">\n\t\t\t<div class="span3">\n\t\t\t\t<p>Birthdate:</p>\n\t\t\t</div>\n\n\t\t\t<!--/span-->\n\t\t\t<div class="span9">\n\t\t\t\t<p>'+
( shredder.birthdate  )+
'</p>\n\t\t\t</div>\n\t\t\t<!--/span-->\n\t\t</div>\n\n\t\t<div class="row-fluid">\n\t\t\t<div class="span3">\n\t\t\t\t<p>Country:</p>\n\t\t\t</div>\n\n\t\t\t<!--/span-->\n\t\t\t<div class="span9">\n\t\t\t\t<p>'+
( shredder.country  )+
'</p>\n\t\t\t</div>\n\t\t\t<!--/span-->\n\t\t</div>\n\n\t\t<div class="row-fluid">\n\t\t\t<div class="span3">\n\t\t\t\t<p>Email:</p>\n\t\t\t</div>\n\n\t\t\t<!--/span-->\n\t\t\t<div class="span9">\n\t\t\t\t<p>'+
( shredder.email  )+
'</p>\n\t\t\t</div>\n\t\t\t<!--/span-->\n\t\t</div>\n\t\t<div class="row-fluid">\n\t\t\t<div class="span3">\n\t\t\t\t<p>Guitar:</p>\n\t\t\t</div>\n\n\t\t\t<!--/span-->\n\t\t\t<div class="span9">\n\t\t\t\t';
 _.each(shredder.guitars , function(guitar) { 
;__p+='\n\t\t\t\t<p>'+
( guitar )+
'</p>\n\t\t\t\t';
 }); 
;__p+='\n\t\t\t</div>\n\t\t</div>\n\t\t<!-- row fluid -->\n\n\t\t<div class="row-fluid">\n\t\t\t<div class="span3">\n\t\t\t\t<p>Equiptment:</p>\n\t\t\t</div>\n\n\t\t\t<!--/span-->\n\t\t\t<div class="span9">\n\t\t\t\t';
 _.each(shredder.equiptment , function(equiptment) { 
;__p+='\n\t\t\t\t<p>'+
( equiptment )+
'</p>\n\t\t\t\t';
 }); 
;__p+='\n\t\t\t</div>\n\t\t\t<!-- row fluid -->\n\t\t</div>\n\n\n\t\t<hr class="soften">\n\t\t<div id="battleRelationship"></div>\n\t\t<hr class="soften">\n\n\t\t<h2>'+
( shredder.username  )+
'\'s fanees</h2>\n\n\t\t<p>List fanees</p>\n\t\t<div class="row-fluid">\n\t\t\t<div class="span1">\n\t\t\t\t<a class="nextShred" href="#">&lsaquo;</a>\n\t\t\t</div>\n\t\t\t';
 _.each( _.first(shredder.fanees, 5), function(fanee) { 
;__p+='\n\t\t\t<div class="span2">\n\t\t\t\t<a href="#shredder/'+
( fanee._id )+
'">\n\t\t\t\t\t<img class="imageClipped"\n\t\t\t\t\tsrc="/pics/profiles/'+
( fanee.profileImagePath )+
'" />\n\t\t\t\t</a>\t   \n\t\t\t\t<p>'+
( fanee.username )+
'</p> \n\t\t\t</div>\n\t\t\t';
 }) 
;__p+='\n\n\t\t\t<div class="span1"> \n\t\t\t\t<a class="nextShred" href="#">&rsaquo;</a>\n\t\t\t</div>\n\t\t</div> \n\n\t\t<hr class="soften"> \n\t\t<div class="row-fluid">\n\t\t\t<div class="span1">\n\t\t\t\t<a class="nextShred" href="#">&lsaquo;</a>\n\t\t\t</div>\n\t\t\t<h2>'+
( shredder.username  )+
'\'s shreds</h2>\n\n\t\t\t';
 _.each( _.first(shredder.shreds, 5), function(shred) { 
;__p+='\n\t\t\t<div class="span2">\n\t\t\t\t<a href="#shredder/'+
( shred._id )+
'">\n\t\t\t\t\t<img class="imageClipped"\n\t\t\t\t\tsrc="/vidz/'+
( shred.videoThumbnail )+
'" />\n\t\t\t\t</a>\t   \n\t\t\t\t<p>'+
( shred.description )+
'</p> \n\t\t\t</div>\n\t\t\t';
 }) 
;__p+='\n\t\t\t<div class="span1"> \n\t\t\t\t<a class="nextShred" href="#">&rsaquo;</a>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n\n<footer>\n\t<p>&copy; Mikey 2012</p>\n</footer>';
}
return __p;
};

this["JST"]["app/templates/Shredder.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='';
}
return __p;
};

this["JST"]["app/templates/shredders/Shredders.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="container">\n\t<div class="marketing">\n\t\t<h1>Shredders</h1>\n\t\t\n\t\t<br>  \n\t\t<input type="text" id="shredderSearch"\n\t\t\tclass="input-medium search-query" placeholder="Search for a shredder">\n\t\t<p class="text-error"></p>\n\n\t\t<br>\n\t\t<a href="#" data-bypass="true" id="nextPage">Next</a>\n\t\t<hr> \n\t\t<div id="twitterDiv"></div>\n\t\t<div id="shreddersListDiv"></div>\n\n\t\t\n\t\t<!-- /marketing -->\n\t</div>\n\t<!-- /container -->\n</div>\n<hr>\n\n<footer>\n\t<p>&copy; Shredhub 2012</p>\n</footer>';
}
return __p;
};

this["JST"]["app/templates/shredders/ShredderThumb.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='\n<div class="row-fluid">\n\t<div class="span2">\n\t\t<img src="/pics/profiles/'+
( model.profileImagePath )+
'"\n\t\talt="Profile img" width="304">\n\t\t<!--/span2-->\n\t</div>\n\t<div class="span10">\n\t\t<a href="/shredder/'+
( model._id )+
'">'+
( model.username )+
'</a>\n\t\t<p class="lead">'+
( model.description )+
'</p>\n\t\t<p class="lead">Level: '+
( model.shredderLevel == 0 ? 0 : Math.floor(model.shredderLevel/10)  )+
'</p>\n\t\t<!-- /span10 -->\n\t</div>\n\t<!-- /row-fluid -->\n</div>\n<hr>';
}
return __p;
};

this["JST"]["app/templates/shredpool/ShredInRow.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="span2">\n\n\t<a href="#shredPool" id="fromFanees_'+
( index )+
'" class="newShredsFromFaneesAncor">\n\t\t<img class="imageClipped"\n\t\tsrc="/vidz/'+
( shred.videoThumbnail )+
'" />\n\t</a>\n\t<p class="lead">'+
( shred.description )+
'</p>\n\t<p class="small">'+
( shred.owner.username )+
'</p>\n\n</div> ';
}
return __p;
};

this["JST"]["app/templates/shredpool/ShredInRow_byTags.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='\n<div class="span2">\n\n\t<a href="#shredPool" id="byTags_'+
( index )+
'" class="newShredsFromFaneesAncor">\n\t\t<img class="imageClipped" \n\t\tsrc="/vidz/'+
( shred.videoThumbnail )+
'" /> \n\t</a>\n\t<p class="lead">'+
( shred.description )+
'</p>\n\t<p>By: '+
( shred.owner.username )+
'</p>\n\t<p>Tags:\n\t\t';
 _.each(shred.tags, function(tag, i) { 
;__p+='\n\t\t';
 if ( i > 0 ) { 
;__p+=', ';
 } 
;__p+='\n\t\t'+
( tag )+
'\n\t\t';
 }) 
;__p+='\t\t\t\n\t</p>\n</div>\n';
}
return __p;
};

this["JST"]["app/templates/shredpool/ShredInRow_mightKnow.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='\n<div class="span3">\n\n\t<a href="#shredPool" id="mightKnow_'+
(  (index) )+
'" class="newShredsFromFaneesAncor">\n\t\t<img class="imageClipped"\n\t\tsrc="/vidz/'+
( shred.videoThumbnail )+
'" />\n\t</a>\n\t<p class="lead">'+
( shred.description )+
'</p>\n\t<p class="small">'+
( shred.owner.username )+
'</p>\n</div>\n';
}
return __p;
};

this["JST"]["app/templates/shredpool/ShredInRow_topRated.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="span5">\n\n\t<div class="row-fluid">\n\t\t<div class="span6">\n\t\t\t<a href="#shredPool" id="topShreds_'+
( (index) )+
'" class="newShredsFromFaneesAncor">\n\t\t\t\t<img class="imageClipped"\n\t\t\t\tsrc="/vidz/'+
( shred.videoThumbnail )+
'" /> \n\t\t\t</a>\n\t\t</div>\n\n\t\t<div class="span6">\n\t\t\t<p class="lead">Rating: '+
( shred.shredRating.currentRating )+
' </p> \n\t\t\t<p>By: '+
( shred.owner.username )+
' </p>\t\t\t\t\n\t\t\t<p>Name: '+
( shred.description )+
' </p> \n\t\t\t<p>Created at: '+
( new Date(shred.timeCreated).toUTCString() )+
' </p>\n\n\t\t</div>\n\t</div>\n</div> ';
}
return __p;
};

this["JST"]["app/templates/shredpool/ShredNews.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='\n<!-- List of shreds -->\n<div class="row-fluid">\n\t<div class="span3">\n\t\t<h5>Newest shreds from your fanees</h5>\n\t\t</br>\n\t\t<div id="newShredFromFaneeNewsItem"></div>\n\t</div>\n\t<div class="span3">\n\t\t<h5>New battleshreds from you fanees</h5>\n\t\t<div id="latesBattleShreds"></div>\n\t\t</br>\n\t</div>\n\t<div class="span3">\n\t\t<h5>New battle created with your fanees in</h5>\n\t\t</br>\n\t\t<div id = "newBattlesFromFanees"></div>\n\t</div>\n\t<div class="span3">\n\t\t<h5>Shredders you might dig</h5>\n\t\t<div id ="shreddersYouMightLike" ></div>\n\t\t</br> \n\t</div>\n\n</div>';
}
return __p;
};

this["JST"]["app/templates/shredpool/ShredNews_battleShreds.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="row-fluid">\n\t\n\t\t';
 if ( _.first(model.battleRounds ).battleesShred != null ) { 
;__p+='\n\t\t\t<p> '+
( model.battlee.username )+
' added a \n\t\t\t<a href="#battles/'+
( model._id )+
'">shred </a>\t\t\t\n\t\t';
 } else { 
;__p+='\n\t\t\t<p> '+
( model.battler.username )+
' added a \t\t\t\n\t\t';
 } 
;__p+='\n\t\t<a href="#battles/'+
( model._id )+
'">shred </a> in a battle\n\t\t<small> at '+
( new Date(model.lastBattleShred).toUTCString() )+
'</small> </p>\n\t\t\n\t\t<hr id="shred" class="soften">\n</div>\n';
}
return __p;
};

this["JST"]["app/templates/shredpool/ShredNews_fromFanees.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="row-fluid">\n<div class="span4">\n\t<a href=""> <img class="imageClipped newsItemImage"\n\t\tsrc="/vidz/'+
( model.videoThumbnail )+
'" width="20" />\n\t</a>\n</div>\n<div class="span8">\n\t<p>\n\t\t<small>'+
( model.description )+
'</small>\n\t</p>\n\t<p>By:<a href="#shredder/'+
( model.owner._id )+
'"> \n\t\t'+
( model.owner.username )+
'\n\t</a></p>\n</div>\n</div>';
}
return __p;
};

this["JST"]["app/templates/shredpool/ShredNews_newBattles.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="row-fluid">\n\t<div class="span5">\n\t\t<img class="imageClipped newsItemImage"\n\t\tsrc="/pics/profiles/'+
( model.battler.profileImagePath )+
'" />\n\t</div>\n\t<div class ="span2">  \n\t\t<h3> <a href="#battles/'+
( model._id )+
'"> VS </a> </h3>\n\t</div>\n\t<div class="span5">\n\t\t<img class="imageClipped newsItemImage"\n\t\tsrc="/pics/profiles/'+
( model.battlee.profileImagePath )+
'" />\n\t</div>\t\t \n</div>\n<div class="row-fluid">\n\t<div class="span5">\n\t\t<p>'+
( model.battler.username )+
'</p>\n\t</div>\n\t<div class ="span2">\n\t\t\n\t</div>\n\t<div class="span5">\n\t\t<p>'+
( model.battlee.username )+
'</p>\n\t</div>\t\t \n</div>\n</br>';
}
return __p;
};

this["JST"]["app/templates/shredpool/ShredNews_shreddersMightLike.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='\t<div class="row-fluid">\n\t\t<div class="span4">\n\t\t\t<a href=""> <img class="imageClipped newsItemImage"\n\t\t\t\tsrc="/pics/profiles/'+
( model.profileImagePath )+
'" />\n\t\t\t</a>\n\t\t</div>\n\t\t<div class="span8">\n\t\t\t<p><a href="#shredder/'+
( model._id )+
'">'+
( model.username )+
'</a></p>\n\t\t\t<p><small>Guitars: \n\t\t\t';
 _.each(model.guitars, function(guitar, i) { 
;__p+='\n\t\t\t\t';
 if ( i > 0 ) { 
;__p+=',';
 } 
;__p+='\n\t\t\t\t'+
( guitar )+
'\n\t\t\t';
 }) 
;__p+='\n\t\t\t</small></p>\n\t\t\t<p> <small> Equiptment:\n\t\t\t';
 _.each(model.equiptment, function(eq, i) { 
;__p+='\n\t\t\t\t';
 if ( i > 0 ) { 
;__p+=',';
 } 
;__p+=' \n\t\t\t\t'+
( eq )+
'\n\t\t\t';
 }) 
;__p+='\n\t\t\t</small></p>\n\t\t</div>\n\t</div> \n\t</br> \n';
}
return __p;
};

this["JST"]["app/templates/shredpool/ShredPool.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<!-- Background image with insert shred over -->\n<!-- Carousel\n\t================================================== -->\n\t<div id="myCarousel" class="carousel slide">\n\t\t<div class="carousel-inner">\n\t\t\t<div class="item active">\n\t\t\t\t<img src="/pics/slashback.jpg" alt="">\n\t\t\t\t<div class="container">\n\t\t\t\t\t<div class="carousel-caption">\n\t\t\t\t\t\t\n\t\t\t\t\t\t<button type="button" class="btn btn-large btn-primary" id="openAddShredModal">Shred!</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<!-- /.carousel -->\n\n\t<div class="container">\n\t\t<div class="marketing">\t\n\t\t\t\n\t\t\t<div class="modal hide fade videoView" backdrop="true"\n\t\t\tid="addShredModal" aria-hidden="true" tabindex="-1" role="dialog"\n\t\t\taria-labelledby="myModalLabel">\n\n\t\t\t<div class="modal-header">\n\t\t\t\t<button type="button" class="close" data-dismiss="modal"\n\t\t\t\taria-hidden="true">x</button>\n\n\t\t\t\t<h2>Add new shred</h2>\n\t\t\t</div>\n\n\t\t\t<div class="modal-body">\n\t\t\t\t<form enctype="multipart/form-data" id="addShredForm">\n\n\t\t\t\t\t<div class="control-group">\n\t\t\t\t\t\t<div class="controls">\n\t\t\t\t\t\t\t<input name="file" type="file"/>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="control-group">\n\t\t\t\t\t\t<label class="control-label" for="inputDescription">Description</label>\n\t\t\t\t\t\t<div class="controls"> \n\t\t\t\t\t\t\t<input type="text" id="inputDescription" name="description" placeholder="Description">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="control-group">\n\t\t\t\t\t\t<label class="control-label" for="inputTags">Tags</label>\n\t\t\t\t\t\t<div class="controls">\n\t\t\t\t\t\t\t<input type="text" id="inputTags" name="tags" \n\t\t\t\t\t\t\tplaceholder="Tag1,tag2,tag3...">\n\t\t\t\t\t\t</div> \n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class="control-group">\n\t\t\t\t\t\t<div class="controls"> \n\t\t\t\t\t\t\t<input type="button" value="Upload" class="bnt btn-primary" id="uploadButton" />\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</form>\n\t\t\t\t<!-- <progress></progress> --> \n\t\t\t</div>\n\n\t\t</div>\n\n\t\t<div id="shredModalDiv"></div>\n\t\t\n\t\t<h2>New shreds from fanees</h2>\n\t\t<div id="newShredsFromFanees"></div>\n\t\t\n\t\t<hr id="shred" class="soften">\n\t\t\n\t\t<h2>Shred News</h2>\n\t\t<br>\n\t\t<div id="shredNews"></div> \n\t\t\n\t\t<hr id="shred" class="soften">\n\n\t\t<h2>Shreds with high rating</h2>\n\t\t<br><br><br>\t\t\n\t\t<div id="topShreds"></div>\n\n\t\t<hr id="shred" class="soften">\n\n\t\t<h2>Shreds from shredders you might know</h2>\n\t\t<br>\n\t\t<div id="mightKnowShreds"></div>\n\n\t\t<hr id="shred" class="soften">\n\n\t\t<h2>Shreds based on tags</h2>\n\t\t<div id="shredsByTags"></div>\n\n\n\t</div>\n</div>\n\n\n';
}
return __p;
};

this["JST"]["app/templates/shredpool/ShredsRow_byTags.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="row-fluid">\n\t<div class="span4">\n\t<!-- \t<a class="nextShred" href="#">&lsaquo;</a>  -->\n\t</div>\n\t<div class="span4">\n\t\t<input type="text" id="tagSearch" class="input-medium search-query"\n\t\t\tplaceholder="tag1, tag2, tag3..">\n\t</div>\n\t<div class="span4">\n\t\t<!-- <a class="nextShred" href="#">&rsaquo;</a> -->\n\t</div>\n</div>\n\n<br>\n\n<div id="shredsByTagsListDiv"></div>\t';
}
return __p;
};

this["JST"]["app/templates/shredpool/ShredsRow_fromFanees.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="row-fluid">\n\t<!-- List of shreds -->\n\t<div class="row">\n\t\t<div class="span2">\n\t\t\t<a class="nextShred nextFromFanees" id = "prevNewFromFanees" data-bypass="true" href="#">&lsaquo;</a>\n\t\t</div>\n\t\t\n\t\t<div id="shredsFromFaneesListDiv"></div>\t\n\n\t\t<div class="span2">\n\t\t\t<a class="nextShred nextFromFanees" id ="nextNewFromFanees" data-bypass="true" href="#">&rsaquo;</a>\n\t\t</div>\n\t\t<!--  row-fluid -->\n\t</div>\n</div>';
}
return __p;
};

this["JST"]["app/templates/shredpool/ShredsRow_mightKnow.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<!-- List of shreds -->\n<div class="row-fluid">\n\n\t<div class="span1">\n\t\t<a class="nextShred nextMightKnow" data-bypass="true" href="#">&lsaquo;</a>\n\t</div>\n\n\t<div id="mightKnowShredsListDiv"></div>\n\t<div class="span2">\n\t\t<a class="nextShred nextMightKnow" data-bypass="true" href="#">&rsaquo;</a>\n\t</div>\n\t<!--  /row-fluid -->\n</div>\n';
}
return __p;
};

this["JST"]["app/templates/shredpool/ShredsRow_topRated.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='\t<div class="row-fluid">\n\t\t<!-- List of shreds -->\n\t\t<div class="row">\n\t\t\t\n\t\t\t<div class="span1">\n\t\t\t\t<a class="nextShred nextTopShreds" data-bypass="true" id = "prevNewFromFanees" href="#">&lsaquo;</a>\n\t\t\t</div>\n\t\t\t\n\t\t\t<div id="topShredsListDiv"></div>\n\t\t\t<div class="span1"> \n\t\t\t\t<a class="nextShred nextTopShreds" data-bypass="true" id = "prevNewFromFanees" href="#">&rsaquo;</a>\n\t\t\t</div>\n\t\t\t<!--  row-fluid -->\n\t\t</div>\n\t</div>';
}
return __p;
};

this["JST"]["app/templates/Twitter.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<ul class="tweets">\n';
 _.each(tweets, function (tweet) { 
;__p+='\n\n  <li>'+
( tweet.get('text') )+
'</li> \n\n';
 }); 
;__p+='\n</ul>';
}
return __p;
};

this["JST"]["app/templates/User.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='';
}
return __p;
};