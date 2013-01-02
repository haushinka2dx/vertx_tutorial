load('vertx.js');

var webServerConf = {
	port : 8080,
	host : 'localhost',
	bridge : true,

	inbound_permitted : [
		// Allow calls to login and authorize
		{
			address : 'vertx.basicauthmanager.login'
		},
		{
			address : 'vertx.mongopersistor',
			match : {
				action : 'find',
				collection : 'albums'
			}
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
vertx.deployModule('vertx.web-server-v1.0', webServerConf);
