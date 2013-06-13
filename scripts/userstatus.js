// Description:
//   Remembers a users status so you can check whats up with him/her
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot status <your status> - Saves your status.
//	 hubot clear s - Deletes your status.
//   hubot list s - List status for each user.
//
// Author:
//   Jamesford

var users_status
users_status = {}

module.exports = function(robot) {

	// Save users status
    robot.respond(/status (.*)/i, function(msg) {
    	status = msg.match[1];
    	users_status[msg.message.user.name] = status;
    	return msg.reply("status set to: " + status);
    });

    // Remove users status
    robot.respond(/clear s/i, function(msg) {
    	delete users_status[msg.message.user.name];
    	return msg.reply("status removed.");
    });

	// List status for each user
	robot.respond(/list s/i, function(msg) {
		var status, user, stat_array;
		stat_array = []
		for (user in users_status) {
			status = users_status[user];
			stat_array.push(user + " - " + status)
		}
		return msg.send("" + stat_array.join('\n'));
	});

    // Listen for mention of user
	robot.hear(/./i, function(msg) {
		var state, substr, user;
		for (user in users_status) {
			state = users_status[user];
			substr = msg.message.text.substring(0, user.length + 1);
			if (substr === user + ':' || substr === '@' + user) {
				msg.send(user + " - " + state)
			}
		}
	});

    // // Console log users_status object
    // robot.respond(/log s/i, function(msg) {
    // 	console.log(users_status);
    // 	return msg.send("Logged to console");
    // });

};