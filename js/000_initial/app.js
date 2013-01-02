load('vertx.js');

var webServerConf = {
	port : 8080,
	host : 'localhost',
	bridge : true,

	inbound_permitted : [
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
vertx.deployModule('vertx.mongo-persistor-v1.2');

// Start the web server, with the config we defined above
vertx.deployModule('vertx.web-server-v1.0', webServerConf);
