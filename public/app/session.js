	// Used to copy-paste in stuff
	define([
		], function(){

			var Session = function() {};

			Session.getUser = function() {
				var user = sessionStorage.getItem("user");
				if ( user ) {
					return JSON.parse(user);
				} else {
					return null;
				}
			};

			Session.setSentBattleRequests = function(reqs) {
				var jsonRqs = JSON.stringify(reqs);
				sessionStorage.setItem("sentBR", jsonRqs);
			};

			Session.setToken = function(token){
				sessionStorage.setItem("token", token);
			};

			Session.getToken = function() {
				return sessionStorage.getItem("token");
			};

			Session.getSentBattleRequests = function() {
				var battleRqs = sessionStorage.getItem("sentBR");
				if ( battleRqs ) {
					return JSON.parse(battleRqs);
				} else {
					return null;
				}
			};

			Session.setUser = function(user) {
				var jsonUser = JSON.stringify(user);
				sessionStorage.setItem("user", jsonUser);
			};

			Session.setBattles = function(battles) {
				var jsonbattles = JSON.stringify(battles);
				sessionStorage.setItem("battles", jsonbattles);
			};

			Session.getBattles = function() {
				var battles = sessionStorage.getItem("battles");
				if ( battles ) {
					return JSON.parse(battles);
				} else {
					return null;
				}
			};

			Session.setIncomingBattleRequests = function(br){
				var jsonreqs = JSON.stringify(br);
				sessionStorage.setItem("incomingBR", jsonreqs);
			};

			Session.getIncomingBattleRequests = function() {
				var br = sessionStorage.getItem("incomingBR");
				if ( br ) {
					return JSON.parse(br);
				} else {
					return null;
				}
			};

			return Session; 
		});