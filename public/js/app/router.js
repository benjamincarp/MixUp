define([
	'backbone'
],function(Backbone){
	var AppRouter = Backbone.Router.extend({
        routes: {
			'drinks': 'drinks',
			'drinks/:drinkID': 'drink',
			'mixers': 'mixers',
			'mixers/:mixerID': 'mixer'
		},

		drinks: function(){console.log('drinks');},

		drink: function(drinkID){console.log(drinkID);},

		mixers: function(){console.log('mixers');},

		mixer: function(mixerID){console.log(mixerID);}

    });


    // Initiate the router
    var app_router = new AppRouter;

    // Start Backbone history a necessary step for bookmarkable URL's
    Backbone.history.start({pushState: true});

});
