// Description:
//   Give, Take and List User Stars
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot give <number> stars to <username> - award <number> stars to <username>
//   hubot give <username> <number> stars - award <number> stars to <username>
//   hubot take <number> stars from <username> - take away <number> stars from <username>
//   hubot how many stars does <username> have? - list how many stars <username> has
//   hubot take all stars from <username> - removes all stars from <username>
//
// Author:
//   Jamesford
//

var award_stars, stars, save;

stars = {};

award_stars = function(msg, username, strs) {
	if (stars[username] === null || stars[username] === NaN) {
    stars[username] = 0;
  };
  stars[username] += parseInt(strs);
	return msg.send(strs + 'Awarded to ' + username);
};

save = function(robot) {
	return robot.brain.data.stars = stars;
};

module.exports = function(robot){

	// Load stored data into stars
	robot.brain.on('loaded', function() {
		return stars = robot.brain.data.stars || {};
	});

	// Give stars
	robot.respond(/give (.*?) (\d+) (stars|star)/i, function(msg) {
		award_stars(msg, msg.match[1], msg.match[2]);
		return save(robot);
	});

  // Remove all stars
  robot.respond(/take all stars from (.*?)\s?$/i, function(msg) {
    var username;
    username = msg.match[1];
    stars[username] = 0;
    msg.send(username + ' WHAT DID YOU DO?!');
    return save(robot);
  });

  // Remove X stars
  robot.respond(/take (\d+) stars from (.*?)\s?$/i, function(msg) {
    var strs, username;
    strs = msg.match[1];
    username = msg.match[2];
    if (stars[username] == null) {
      stars[username] = 0;
    }
    if (stars[username] === 0) {
      msg.send(username + ' Does Not Have Any Stars To Take Away');
    } else {
      stars[username] -= parseInt(pts);
      msg.send(strs + ' Stars Taken Away From ' + username);
    }
    return save(robot);
  });

  robot.respond(/how many stars does (.*?) have\??/i, function(msg) {
    var username;
    username = msg.match[1];
    if (stars[username] == null) {
      stars[username] = 0;
    }
    return msg.send(username + ' Has ' + stars[username] + ' Stars');
  });

};