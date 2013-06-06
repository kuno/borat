# Description:
#   Enter and Exit Messages
#
# Commands:
#
#

module.exports = (robot) ->

  robot.enter (response) ->
    response.send response.message.user.name + " has joined"

  robot.leave (response) ->
    response.send response.message.user.name + " has left the building."