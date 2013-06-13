# Description:
#   Natural availability tracking.
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   brb - Let Borat know your away
#	afk - Let Borat know your away
#
# Author:
#   jmhobbs
#

module.exports = (robot) ->

	users_away = {}

	robot.hear( /./i, (msg) ->
		if users_away[msg.message.user.name] and msg.message.text != 'brb' and msg.message.text != 'afk'
			msg.send "Welcome back " + msg.message.user.name + "!"
			delete users_away[msg.message.user.name]
		else
			for user, state of users_away
				substr = msg.message.text.substring(0, user.length+1)
				if substr == user + ':' || substr == '@' + user
					msg.send user + " is currently away."
					break
		)

	robot.hear /(brb|afk)/i, (msg) ->
		users_away[msg.message.user.name] = true