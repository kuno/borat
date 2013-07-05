// Description
//   Testing Borat Private Messages
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   None
//
// Notes:
//   None
//
// Author:
//   Jamesford

module.exports = function(robot) {

  robot.respond(/pm (.*)/i, function(msg) {
    var users, m;
    m = msg.match[1];

    msg.send(robot.brain.users)
    return msg.send(jamesford + ("" + m + "");
  });

};