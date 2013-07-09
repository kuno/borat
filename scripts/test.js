module.exports = function(robot) {

	robot.respond(/cmd test/i, function(msg) {
		msg.send(robot.brain.data.points);
	});

	robot.respond(/cmd storage delete/i, function(msg) {
		delete robot.brain.data.users;
		msg.send("Users Removed");
	})
	
};