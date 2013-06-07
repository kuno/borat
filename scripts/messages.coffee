# Description:
#   Remembers messages to pass on to whomever you like!
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   hubot <user> message <message> - sends a <message> to <user> when they log on.
#
# Author:
#   Jamesford

messages = []

module.exports = (robot) ->
    robot.respond /(.*) message (.*)/i, (msg) ->
        to = msg.match[1]
        message = msg.match[2]
        from = msg.message.user.name

        msg.reply "Got it, when #{to} comes online I'll pass it along."
        messages.push {'to':to, 'message':message, 'from':from}

        to = ''
        message = ''
        from = ''


    robot.respond /list m/i, (msg) -> # Not working since push change!
        if messages.length == 0
            msg.send "Message queue empty!"
        else
            msg.send messages


    robot.respond /clear m/i, (msg) -> # For debug, messages will clear when retrieved
        if messages.length == 0
            msg.send "Message queue empty!"
        else
            messages = []
            msg.send "Message queue has been cleared."


    robot.respond /my m/i, (response) ->
        name = response.message.user.name
        if messages.length == 0
            response.reply "No messages!"
        else
            reciever = messages[0].to
            sender = messages[0].from
            body = messages[0].message

            response.send "#{reciever}: #{sender} - #{body}"