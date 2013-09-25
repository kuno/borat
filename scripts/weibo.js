// Description:
//   Gets and posts weibos
//
// Dependencies:
//   "node-sina-weibo": "*"
//
// Configuration:
//   None
//
// Commands:
//   hubot get weibos <amount> - fetch x amount of weibo posts
//   hubot post weibo <message> - post a message to weibo 
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

    for(i=0; i < admins.length; i++) {
        if(user === admins[i]) {
            return true
        }
    }
    return false
}

// Require node-sina-weibo
var SinaWeibo = require('node-sina-weibo');

// Environment variables
var clientId = "3993654974";
var clientSecret = "0858634a81dde165396113b127fbdd71";
var accessToken = "2.00TJX2JCuFyQ3E87d905cd46058uTR";

// Init Weibo
var weibo = new SinaWeibo(clientId, clientSecret, accessToken);

// Weibo functions
var getWeibos = function(amount, callback) {
    weibo.GET('statuses/friends_timeline', {count: amount}, function(err, response, data) {
        if(err) { return callback(err) };
        callback(response.statuses);
    });
};

var newWeibo = function(message, callback) {
    weibo.POST('statuses/update', {status: message}, function(err, response, data) {
        if(err) { return callback(err) };
        callback(response);
    });
};

module.exports = function(robot) {

    robot.respond(/get weibos ?(.*)/i, function(msg) {
        var messages = '';
        var count = msg.match[1];
        count = parseInt(count);
        if(isNaN(count)) {
            count = 5;
        };
        getWeibos(count, function(data) {
            for(i = 0; i < data.length; i++) {
                messages += data[i].user.name + ' - ' + data[i].text;
                if(i < data.length - 1) {
                    messages += '\n ----------- \n';
                }
            };
            return msg.send(messages);
        });
    });

    robot.respond(/post weibo (.*)/i, function(msg) {
        var admin = isAdmin(msg.message.user.id.toString());
        var message = msg.match[1];
        message.toString();
        if(admin === true) {
            newWeibo(message, function(data) {
                return msg.send('Created at: '+data.created_at);
            });
        } else {
            return msg.send('Only admins can post weibos.');
        }
    });

};