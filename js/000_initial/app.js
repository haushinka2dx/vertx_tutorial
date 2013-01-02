load('vertx.js');

var webServerConf = {
	port: 8080,
	host: 'localhost'
};

// Start a MongoDB persistor module
vertx.deployModule('vertx.mongo-persistor-v1.2');

// Start the web server, with the config we defined above
vertx.deployModule('vertx.web-server-v1.0', webServerConf);
