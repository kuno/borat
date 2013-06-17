# Borat quote

module.exports = (robot) ->
  robot.hear /great|success/i, (msg) ->
    msg.send "Great success! High five!!"