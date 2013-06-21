# Mind blown and other funny things

module.exports = (robot) ->
  robot.hear /mind blown/i, (msg) ->
    msg.send "http://www.zawarudo.com/wp-content/uploads/2012/11/mind-blown-2.gif"
