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
        messages.push "{'to':'#{to}' 'message':'#{message}', 'from':'#{from}'}"

        to = ''
        message = ''
        from = ''


    robot.respond /list m/i, (msg) ->
        if messages.length == 0
            msg.send "Message queue empty!"
        else
            msg.send messages


    robot.respond /clear m/i, (msg) ->
        if messages.length == 0
            msg.send "Message queue empty!"
        else
            messages = []
            msg.reply "Message queue has been cleared."

    robot.respond /my m/i, (response) ->
        name = response.message.user.name

        response.send messages[0].to

