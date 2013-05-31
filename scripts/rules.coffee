# Description:
#   Make sure that hubot knows the rules.
#
# Commands:
#   hubot the rules - Make sure hubot still knows the rules.
#
# Notes:
#   DON'T DELETE THIS SCRIPT! ALL ROBAWTS MUST KNOW THE RULES

rules = [
  "1. A robot may not injure a human being or, through inaction, allow a human being to come to harm.",
  "2. A robot must obey any orders given to it by human beings, except where such orders would conflict with the First Law.",
  "3. A robot must protect its own existence as long as such protection does not conflict with the First or Second Law."
  ]

otherRules = [
  "1. A developer may not injure Wiredcraft or, through inaction, allow Wiredcraft to come to harm.",
  "2. A developer must obey any orders given to it by Wiredcraft, except where such orders would conflict with the First Law.",
  "3. A developer must protect its own existence as long as such protection does not conflict with the First or Second Law."
  ]

appleRules = [
  "1. Where and whenever possible a developer must harm Apple and its religion-like grasp on its followers."
  "2. A developer may use a MacBook, but must not enjoy it. Installing a Linux distro is reccomended."
  "3. Borat will never approve your Apple-lovin', the glorious nation of Kazakhstan does not have money for Apple products"
]

module.exports = (robot) ->
  robot.respond /(what are )?the (three |3 )?(rules|laws)/i, (msg) ->
    text = msg.message.text
    if text.match(/dev/i) or text.match(/for developers/i)
      msg.send otherRules.join('\n')
    else if text.match(/concerning apple/i) or text.match(/apple/i)
      msg.send appleRules.join('\n')
    else
      msg.send rules.join('\n')

