load('vertx.js');
load('time_service.js');

var webServerConf = {
	port : 8080,
	host : 'localhost',
	ssl : true,
	bridge : true,

	// This defines which messages from the client we will let throught
	// from the client
	inbound_permitted : [
		// Allow calls to login and authorize
		{
			address : 'vertx.basicauthmanager.login'
		},
		// Allow calls to get static album data from the persistor
		{
			address : 'vertx.mongopersistor',
			match : {
				action : 'find',
				collection : 'albums'
			}
		},
		{
			address : 'vertx.mongopersistor',
			requires_auth : true, // User must be logged in to send let these through
			match : {
				action : 'save',
				collection : 'orders'
			}
		},
		// Allow calls timeService API
		{
			address : 'acme.timeService',
		}
	],
	outbound_permitted : [ {} ]
};

// Start a MongoDB persistor module
vertx.deployModule('vertx.mongo-persistor-v1.2', null, 1, function() {
	load('static_data.js');
});

// Deploy an auth manager to handle the authentication
vertx.deployModule('vertx.auth-mgr-v1.1');

// Start the web server, with the config we defined above
vertx.deployModule('vertx.web-server-v1.0', webServerConf, 8);
