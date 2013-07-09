module.exports = function(robot) {

	robot.respond(/cmd test/i, function(msg) {
		console.log(robot.brain.data.users);
		// data = String(robot.brain.data.users);
		// msg.send(data);
	});

	robot.respond(/storage delete (\w*)$/i, function(msg) {
		delete robot.brain.data[msg.match[1]];
		return msg.send("" + msg.match[1] + " deleted from storage.");
	});
	
};