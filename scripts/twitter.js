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
//   hubot get tweets <search term> - Gets tweets
//   hubot tweet <message> - Post tweet to @wiredcraft
//   hubot devops tweet <message> - Post tweet to @devo_ps
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

// Twitter
var twitter = require('simple-twitter');

// @wiredcraft Twitter
WCL = new twitter(
process.env.WCL_CONSUMER_KEY,
process.env.WCL_CONSUMER_SECRET,
process.env.WCL_ACCESS_TOKEN,
process.env.WCL_ACCESS_TOKEN_SECRET,
false
);

// @devo_ps Twitter
DEVOPS = new twitter(
process.env.DEVOPS_CONSUMER_KEY,
process.env.DEVOPS_CONSUMER_SECRET,
process.env.DEVOPS_ACCESS_TOKEN,
process.env.DEVOPS_ACCESS_TOKEN_SECRET,
false
);


// Get tweets (uses @wiredcraft)
var getTweets = function(term, callback) {
    WCL.get('search/tweets', '?q=' + term, function(error, data) {
        var sData = JSON.parse(data).statuses;
        callback(sData);
    });
};

// New Tweet
var newTweet = function(message, account, callback) {
    if(account == 'devops'){
        DEVOPS.post('statuses/update', {'status' : message}, function(error, data) {
            sData = JSON.parse(data);
            if (error) {
                callback('Something went wrong ' + error);
            } else {
                callback('Success - ' + 'http://twitter.com/' + sData.user.screen_name); 
            }
        });
    } else {
        WCL.post('statuses/update', {'status' : message}, function(error, data) {
            sData = JSON.parse(data);
            if (error) {
                callback('Something went wrong ' + error);
            } else {
                callback('Success - ' + 'http://twitter.com/' + sData.user.screen_name); 
            }
        });
    }
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
                string += data[i].user.name + ' - ' + data[i].text;
                string += '\n ----------- \n'
            };
            return msg.send(string);
        });
    });

    robot.respond(/(devops)? ?tweet (.*)/i, function(msg) {
        var admin = isAdmin(msg.message.user.id.toString());
        var tweet = msg.match[2];
        var account = msg.match[1];
        if(admin === true) {
            newTweet(tweet, account, function(data) {
                return msg.send(data);
            });
        } else {
            return msg.send('Only admins can post tweets.');
        };
    });

};


