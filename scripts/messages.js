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
//   hubot <user> message <your message> - have hubot pass on a message
//   hubot my m - check your messages
//
// Author:
//   Jamesford


var messages;
messages = [];

module.exports = function(robot) {
    
    // Save a message for someone
    robot.respond(/(.*) (message|m) (.*)/i, function(msg) {
        var from, message, to;
        to = msg.match[1];
        message = msg.match[3];
        from = msg.message.user.name;
        msg.reply("Got it, saved message for " + to + ".");
        messages.push({
            'to': to,
            'message': message,
            'from': from
        });
        to = '';
        message = '';
        from = '';
    });


    // List all messages being held
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


    // Clear all messages being held
    robot.respond(/clear m/i, function(msg) {
        if (messages.length === 0) {
            return msg.send("Message queue empty!");
        } else {
            messages = [];
            return msg.send("Message queue has been cleared.");
        }
    });


    // Check your messages
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