// Description:
//   Remembers messages to pass on to whomever you like!
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot <user> message <message> - sends a <message> to <user> when they log on.
//
// Author:
//   Jamesford


var messages;
messages = [];

module.exports = function(robot) {
  
  robot.respond(/(.*) message (.*)/i, function(msg) {
    var from, message, to;
    to = msg.match[1];
    message = msg.match[2];
    from = msg.message.user.name;
    msg.reply("Got it, when " + to + " comes online I'll pass it along.");
    messages.push({
      'to': to,
      'message': message,
      'from': from
    });
    to = '';
    message = '';
    from = '';
  });


  robot.respond(/list m/i, function(msg) {
    var listmessages;
    listmessages = []

    if (messages.length === 0) {
      return msg.send("Message queue empty!");
    } else {
      for (i = 0; i < messages.length; i++) {
        listmessages.push("" + messages[i].from + " to " + messages[i].to + " - " + messages[i].message)
      }
      return msg.send(listmessages.join('\n'));
    }
  });


  robot.respond(/clear m/i, function(msg) {
    if (messages.length === 0) {
      return msg.send("Message queue empty!");
    } else {
      messages = [];
      return msg.send("Message queue has been cleared.");
    }
  });


  robot.respond(/my m/i, function(response) {
    var name, mymessages;
    name = response.message.user.name;
    mymessages = []

    if (messages.length === 0) {
      return response.reply("No messages!");
    } else {
      for (i = 0; i < messages.length; i++) {
        if (name === messages[i].to) {
          mymessages.push("" + messages[i].from + " - " + messages[i].message);
        }
      }

      if (mymessages.length === 0) {
        return response.reply("No messages!")
      } else {
        return response.send("" + mymessages.join('\n'));
      }
    }
  });

};