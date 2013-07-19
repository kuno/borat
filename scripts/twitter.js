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

// Admin Checker
function isAdmin(user) {    
    if (process.env.HUBOT_AUTH_ADMIN) {
        admins = process.env.HUBOT_AUTH_ADMIN.split(',');
    } else {
        return false
    }

    for(i=0; i < admins.length; i++){
        if(user === admins[i]) {
            return true
        }
    }
    return false
}

// Defining variables and functions
var twitter = require('simple-twitter');
twitter = new twitter(
process.env.TWITTER_CONSUMER_KEY,
process.env.TWITTER_CONSUMER_SECRET,
process.env.TWITTER_ACCESS_TOKEN,
process.env.TWITTER_ACCESS_TOKEN_SECRET,
false
);

// Get tweets
var getTweets = function(term, callback) {
    twitter.get('search/tweets', '?q=' + term, function(error, data) {
        var sData = JSON.parse(data).statuses;
        callback(sData);
    });
};

// New Tweet
var newTweet = function(message, callback) {
    twitter.post('statuses/update', {'status' : message}, function(error, data) {
        sData = JSON.parse(data);
        if (error) {
            callback('Something went wrong ' + error);
        } else {
            callback('Success - ' + 'http://twitter.com/' + sData.user.screen_name); 
        }
    });  
};


// Hubot commands in here!
module.exports = function(robot) {

    robot.respond(/get tweets (.*)/i, function(msg) {
        var string = '';
        var str = msg.match[1];
        var term = str.replace(/@/g, '%40')
                      .replace(/ /g, '%20')
                      .replace(/#/g, '%23');
        getTweets(term, function(data) {
            for(i=0; i < data.length; i++) {
                string += data[i].text;
                string += '\n'
            };
            return msg.send(string);
        });
    });

    robot.respond(/tweet (.*)/i, function(msg) {
        var admin = isAdmin(msg.message.user.id.toString());
        var tweet = msg.match[1];
        if(admin === true) {
            newTweet(tweet, function(data) {
                return msg.send(data);
            });
        } else {
            return msg.send('Only admins can post tweets.');
        };
    });

};


