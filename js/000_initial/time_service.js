load('vertx.js');

console.log('time_service.js was loaded.');

vertx.eventBus.registerHandler("acme.timeService", function(message, replier) {
	console.log("acme.timeService was called.");
	replier({current_time: new Date().getTime()});
});
