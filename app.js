var application_root  = __dirname,
express               = require("express"),
path                  = require("path"),
fs                    = require('fs'),
http                  = require('http'),
port                  = (process.env.VMC_APP_PORT || 3000),
host                  = (process.env.VCAP_APP_HOST || 'localhost'),
redis                 = require("redis"),
passport              = require('passport'),
util                  = require('util'),
shredController       = require('./controllers/shredController'),
shredderController    = require('./controllers/shredderController'),
battleController      = require('./controllers/battleController'),
mongoConfig           = require('./mongoConfig'),
$                     = require('jquery'),
BasicStrategy = require('passport-http').BasicStrategy;

var app = express();
var redisClient = redis.createClient();


app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', application_root + '/views'); 
  app.use(express.logger('dev'));
  app.use(express.bodyParser({uploadDir:'./uploads'}));
  app.use(express.methodOverride());
  //app.use(express.cookieParser('your secret here'));
  // Initialize Passport!  Note: no need to use session middleware when each
  // request carries authentication credentials, as is the case with HTTP Basic.
  app.use(passport.initialize());
  app.use(app.router);
  app.use(express.static(path.join(application_root, 'public')));
});

// Set development specific
app.configure('development', function(){
  app.use(express.errorHandler());
});


passport.use(new BasicStrategy({},
  function(username, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      redisClient.get("username:" + username + ":uid", function(err, res) {
          if (res) {
          var uid = res.toString();
          redisClient.get("uid:"+uid + ":password", function(err,res) {

            if ( password === res.toString() ) {
             // console.log("Login success");
              return done(null, {"username": username, "password":password, "uid":uid});
            } else {
             // console.log("wrong password: " + password);
              return done(null, false,{ message: 'Incorrect password.' }); 
            }
          });
          } else {
            return done(null, false, { message: 'Incorrect username.' }); 
          }
      });
    });
  }
))


/* Mongoose */
mongoConfig.connectToMongo();
 

/** Routes */
app.get('/', function(req, res){
  res.sendfile(application_root + '/public/index.html');
});


app.post('/api/authenticate', 
  passport.authenticate('basic', { session: false, failureRedirect: '/#login' }),
  function(req, res) {
    return shredderController.getShredderById(req.user.uid, res);
    //res.json(req.user);
});

app.post('/api/shreds', passport.authenticate('basic', { session: false, failureRedirect: '/#login' }),
  shredController.createShred);
app.post('/api/shreds/:uid',passport.authenticate('basic', { session: false, failureRedirect: '/#login' }), shredController.updateShredVithVideo);
app.get('/api/shreds/bestRated', shredController.getShredsByRating);


/* Shredhub 1.0 API */

/* Shreds */
app.get('/api/shreds/NewShredsFromFanees/:uid',passport.authenticate('basic', { session: false, failureRedirect: '/#login' }), shredController.getNewShredsFromFanees);
app.get('/api/shreds/shredsYouMightKnow/:uid', passport.authenticate('basic', { session: false, failureRedirect: '/#login' }),shredController.getShredsYouMightKnow);
app.get('/api/shreds/shredsByTags/:uid',passport.authenticate('basic', { session: false, failureRedirect: '/#login' }), shredController.getShredsByTags);
app.get('/api/shreds/shredder/:uid',passport.authenticate('basic', { session: false, failureRedirect: '/#login' }), shredController.getShredsByShredder);
app.put('/api/shreds/:uid',passport.authenticate('basic', { session: false, failureRedirect: '/#login' }), shredController.updateShred);

/* Battles */
app.post('/api/battles',passport.authenticate('basic', { session: false, failureRedirect: '/#login' }), battleController.createBattle);
app.get('/api/battles/withFanees/:uid', passport.authenticate('basic', { session: false, failureRedirect: '/#login' }),battleController.getNewBattleswithFanees);
app.get('/api/battles/withLatestBattleShredsFromFanees/:uid', passport.authenticate('basic', { session: false, failureRedirect: '/#login' }),battleController.getLatestBattleShredsFromFanees);
app.get('/api/battles/battlesForTwo',passport.authenticate('basic', { session: false, failureRedirect: '/#login' }), battleController.getBattlesForTwo);
app.get('/api/battles/:uid',passport.authenticate('basic', { session: false, failureRedirect: '/#login' }), battleController.getBattlesForShredder);

/* Battle Requests */
app.post('/api/battleRequests/',passport.authenticate('basic', { session: false, failureRedirect: '/#login' }), battleController.createBattleRequest);
app.delete('/api/battleRequests/:uid',passport.authenticate('basic', { session: false, failureRedirect: '/#login' }), battleController.deleteBattleRequest);
app.post('/api/battleRequests/:uid',passport.authenticate('basic', { session: false, failureRedirect: '/#login' }), battleController.updateBattleRequest);
app.get('/api/battleRequests/shredder/:uid',passport.authenticate('basic', { session: false, failureRedirect: '/#login' }), battleController.getBattleRequestsForShredderWithId);
app.get('/api/battleRequests/battlesForTwo',passport.authenticate('basic', { session: false, failureRedirect: '/#login' }), battleController.getBattleRequestsForTwo);
app.get('/api/battleRequests/sent/:uid', passport.authenticate('basic', { session: false, failureRedirect: '/#login' }),battleController.getSentBattleRequestsForShredderWithId);

/* Shredders */ 
app.get('/api/shredders/mightKnowShredders/:uid',passport.authenticate('basic', { session: false, failureRedirect: '/#login' }), shredderController.getShreddersShredderMightLike);
app.get('/api/shredders/:uid',passport.authenticate('basic', { session: false, failureRedirect: '/#login' }), shredderController.apiGetShredderById);
app.get('/api/shredders',passport.authenticate('basic', { session: false, failureRedirect: '/#login' }), passport.authenticate('basic', { session: false, failureRedirect: '/#login' }),
 shredderController.getAllShreddersByTimeCreated);
app.put('/api/shredders/:uid/addFanee',passport.authenticate('basic', { session: false, failureRedirect: '/#login' }),shredderController.addFaneeForShredderWithId);
app.put('/api/shredders/:uid', passport.authenticate('basic', { session: false, failureRedirect: '/#login' }),shredderController.updateShredder);
app.put('/api/shredders/:uid/guitar/:gIndex/dig', passport.authenticate('basic', { session: false, failureRedirect: '/#login' }),shredderController.digGuitar);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Wazzup, up and running yo. Le port: " + app.get('port'));
});
