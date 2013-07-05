// Description
//   Allows you to "yell" your message to everyone in the room
//
// Dependencies:
//   "underscore": "1.3.3"
//
// Configuration:
//   None
//
// Commands:
//   hubot yell <message> - Sends your message and mentions everyone curently in the chat room.
//
// Notes:
//   Nobody likes when you yell all the time :(
//
// Author:
//   MattSJohnston

var toTitleCase, _;
_ = require('underscore');

toTitleCase = function(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

module.exports = function(robot) {

  robot.respond(/yell (.*)/i, function(msg) {
    var users;
    users = _.reject(_.values(_.pluck(robot.brain.users, 'name')), function(name) {
      return name === msg.message.user.name;
    });
    return msg.send(users.length ? users.join(', ') + (": " + msg.match[1]) : "If a tree falls in a forest and no one is around to hear it, does it make a sound?");
  });

};