// Create shreds
db.shredder.remove({});
db.shred.remove({});
db.battle.remove({});
db.battleRequest.remove({});

var countries = [ "Norway", "Sweden", "Denmark", "Australia", "USA", "England",
		"Finland", "Germany", "Argentina", "Spain" ];

var g = [ "Gibson les paul", "Fender stratocaster", "Fender telecaster",
		"Music man luke", "Ibanez REM", "Ibanez RG", "Gibson sg",
		"Gibson explorer", "Peavey wolfgang", "Gibson flying v" ];

var eq = [ "Marshall", "Fender", "ENGL", "Mesa", "Orange", "Peavey", "Morgan",
		"Randall", "Line 6", "Vox" ];

var img = [ "EddieVanHalen.jpg", "RobertoDeMicheli.jpg", "michael.jpg",
		"MikeSpike.jpg", "SteveLukather.jpg", "michaelH.jpg", "Hslash.jpg",
		"SteveLukatherH.jpg", "patty ho.jpg", "JohnPetrucci.jpg",
		"SteveMorse.jpg", "richie.jpg", "JohnPetrucciH.jpg", "SteveVai.jpg",
		"richieH.jpg", "Thor.jpg", "slash.jpg", "MartSpart.jpg", "weegs.JPG",
		"MikeSpike.jpg", "YngwieMalmsteen.jpg", "Roberto.jpg" ];

// create 1000 shredders
for ( var i = 1; i <= 1000; i++) {

	var r = Math.floor(Math.random() * countries.length);
	var r2 = Math.floor(Math.random() * g.length);
	var r3 = Math.floor(Math.random() * eq.length);
	var r4 = Math.floor(Math.random() * 22);
	var r5 = Math.floor(Math.random() * 100);

	var sh = {
		username : "Shredder" + i,
		fanees : new Array(),
		birthdate : new Date(),
		country : countries[r],
		profileImagePath : img[r4],
		email : "shredder" + i + "@slash.com",
		guitars : [ g[r2] ],
		equiptment : [ eq[r3] ],
		description : "Simple test shredder #" + i,
		timeCreated : new Date(),
		shredderLevel : r5
	};

	db.shredder.save(sh);
}

var shredders = db.shredder.find({});
var count = db.shredder.count();

var shr = [ "1.mp4", "13.mp4", "17.mp4", "20.mp4", "24.mp4", "26.mp4", "3.mp4",
		"4.mp4", "8.mp4", "sapsapsap2.mp4", "sfsdf.mp4", "ynsrv.mp4", "10.mp4",
		"14.mp4", "18.mp4", "21.mp4", "23shred1.mp4", "27.mp4", "30.mp4",
		"5.mp4", "9.mp4", "9shred7.mp4", "crap.mp4", "dminor.mp4", "f.mp4",
		"g.mp4", "legato.mp4", "lovaabadname.mp4", "11.mp4", "15.mp4",
		"19.mp4", "22.mp4", "24shred5.mp4", "28.mp4", "31.mp4", "6.mp4",
		"sfhd.mp4", "sleep.mp4", "vid.mp4", "12.mp4", "16.mp4", "2.mp4",
		"23.mp4", "23shred2.mp4", "25.mp4", "29.mp4", "32.mp4", "7.mp4",
		"9shred3.mp4", "c.mp4", "dfh.mp4", "edf.mp4", "fgdf.mp4", "h.mp4",
		"livinprayer.mp4", "s.mp4" ];

var thumbs = [ "23shred1.jpg", "9shred7.jpg", "crap.jpg", "dminor.jpg",
		"f.jpg", "g.jpg", "legato.jpg", "lovaabadname.jpg", "test2.jpg",
		"24shred5.jpg", "sfhd.jpg", "sleep.jpg", "vid.jpg", "23shred2.jpg",
		"9shred3.jpg", "c.jpg", "dfh.jpg", "edf.jpg", "fgdf.jpg", "h.jpg",
		"livinprayer.jpg", "s.jpg", "sfsdf.jpg", "test.jpg", "ynsrv.jpg" ];

var tagsArr = [ "Lick", "Fast", "Technique", "Sweeping", "Tapping", "Cover",
		"Solo", "Instruction", "Sound test", "Mind blowing", "Passionate",
		"British", "Punk", "Grip", "Chords", "Melody", "Scale", "Show-off",
		"Jazz", "Fusion", "Rock", "Metal", "Pop", "Rap", "Funk", "Acoustic",
		"Chops", "Jam", "Improvisation" ];

// Create 100 000 shreds 
for ( var i = 1; i <= 50000; i++) {

	var ran = Math.floor(Math.random() * count);
	var ranS = Math.floor(Math.random() * count);
	var ran2 = Math.floor(Math.random() * shr.length);
	var ran3 = Math.floor(Math.random() * thumbs.length);
	var tagsRan = Math.floor(Math.random() * tagsArr.length);
	var tagsRan2 = Math.floor(Math.random() * tagsArr.length);
	var ranrate = Math.floor(Math.random() * 1000);
	var ranrate2 = Math.floor(Math.random() * 10000);

	var img = shr[ran2].split(".")[0].concat(".jpg");

	db.shred.save({
		description : "Simple test shred #" + i,
		owner : {
			_id : shredders[ran]._id,
			username : shredders[ran].username,
			imgPath : shredders[ran].imgPath
		}, // nice cause java can convert eagerly with dbrefs
		timeCreated : new Date(),
		shredType : "normal",
		shredComments : [ 
		{
			timeCreated : new Date(),
			text : "Lorem ipsum lol cat mode" + i,
			commenterId : shredders[ranS]._id,
			commenterName : shredders[ranS].username
		},
		{
			timeCreated : new Date(),
			text : "Saps ipsumalis lol cat mode" + (i+1),
			commenterId : shredders[ranS]._id,
			commenterName : shredders[ranS].username		
		} 
		],
		shredRating : {
			numberOfRaters : ranrate,
			currentRating : ranrate2
		},
		videoPath : shr[ran2],
		videoThumbnail : thumbs[ran3],
		tags : [ tagsArr[tagsRan], tagsArr[tagsRan2] ]
	});
}


// Get shredders
var shredders = db.shredder.find({});
var size = db.shredder.count();

// Create battles
for ( var i = 1; i <= 10000; i++) {
	var ran1 = Math.floor(Math.random() * size);
	var ran2 = Math.floor(Math.random() * size);
	var ran3 = Math.floor(Math.random() * shr.length);
	var ran4 = Math.floor(Math.random() * thumbs.length);

	if ( ran1 == ran2)
		ran2 = Math.floor(Math.random() * size);

	var battleRound = {

		battlersShred : {
			rating : {
				currentRating : 0,
				numberOfRaters : 0
			},
			timeCreated : new Date(),
			videoPath : shr[ran3],
			videoThumbnail : thumbs[ran4]
		},
		battleesShred : null
	};

	db.battle.save({
		battler : {
			_id : shredders[ran1]._id,
			profileImagePath : shredders[ran1].profileImagePath,
			username : shredders[ran1].username,
		},
		battlee : {
			_id : shredders[ran2]._id,
			profileImagePath : shredders[ran2].profileImagePath,
			username : shredders[ran2].username,
		},
		timeCreated : new Date(),
		battleStyle : "Bet you can't shred this",
		round : 1,
		lastBattleShred : new Date(),
		battleRounds : [ battleRound ]
	});
}

//Create battle requests
var shredders = db.shredder.find({});
var size = db.shredder.count();
for ( var i = 1; i <= 1000; i++) {
	var ran1 = Math.floor(Math.random() * size);
	var ran2 = Math.floor(Math.random() * size);
	var ran3 = Math.floor(Math.random() * shr.length);
	var ran4 = Math.floor(Math.random() * thumbs.length);

	if ( ran1 == ran2)
		ran2 = Math.floor(Math.random() * count);

	db.battleRequest.save({ // At first I used DBRefs for this
		battler : {
			_id : shredders[ran1]._id,
			username : shredders[ran1].username
		},
		battlee : {
			_id : shredders[ran2]._id,
			username : shredders[ran2].username
		},
		timeCreated : new Date(),
		battleStyle : "Bet you can't shred this",
		videoPath : shr[ran3],
		videoThumbnail : thumbs[ran4],
	});
}


// Create fanees

var shredders = db.shredder.find();
var size = db.shredder.count();

for ( var i = 0; i < size; i++) {
	var shredder = shredders[i];

	// Max 10 fanees
	var faneeNum = Math.floor(Math.random() * 10);

	for ( var y = 0; y < faneeNum; y++) {
		var faneeI = Math.floor(Math.random() * size);
		var fanee = {
			_id : shredders[faneeI]._id,
			username : shredders[faneeI].username,
			profileImagePath : shredders[faneeI].profileImagePath
		}
		shredder.fanees.push(fanee);
	}

	db.shredder.save(shredder);
}
