// Description:
//   Gets and will eventually post Tweets!
//
// Dependencies:
//   "simple-twitter": "1.0.3"
//
// Configuration:
//   None
//
// Commands:
//   hubot get tweets - Gets tweets mentioning "wiredcraft"
//
// Author:
//   Jamesford

var twitter = require('simple-twitter');
twitter = new twitter(
process.env.TWITTER_CONSUMER_KEY, //consumer key from twitter api
process.env.TWITTER_CONSUMER_SECRET, //consumer secret key from twitter api
process.env.TWITTER_ACCESS_TOKEN, //acces token from twitter api
process.env.TWITTER_ACCESS_TOKEN_SECRET, //acces token secret from twitter api
false  //(optional) time in seconds in which file should be cached (only for get requests), put false for no caching
);

// Check for admin - Commented out for now as posting a tweet hasn't been included
// function isAdmin(user) {    
//     if (process.env.HUBOT_AUTH_ADMIN) {
//         admins = process.env.HUBOT_AUTH_ADMIN.split(',');
//     } else {
//         return false
//     }
//     for(i=0; i < admins.length; i++){
//         if(user === admins[i]) {
//             return true
//         }
//     }
//     return false
// }

// Get tweets
var getTweets = function(term, callback) {
    twitter.get('search/tweets', '?q=' + term, function(error, data) {
        var sData = JSON.parse(data).statuses;
        callback(sData);
    });
};

module.exports = function(robot) {

    robot.respond(/get tweets (.*)/i, function(msg) {
        var string = '';
        var term = msg.match[1];
        getTweets(function(term, data) {
            for(i=0; i < data.length; i++) {
                string += data[i].text;
                string += '\n'
            };
            return msg.send(string);
        });
    });

};