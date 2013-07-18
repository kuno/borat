// Description:
//   Runs shell commands that we need ran
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot invite <user> - invite user to jabber
//   hubot kick <user> - remove user from jabber
//
// Author:
//   Jamesford


// Globally available variables, functions and more...
var util = require('util'),
    exec = require('child_process').exec,
    child, abort, kicking;

function makePass() {
  var x;
  x = Math.random().toString(36).slice(-8);
  return x;
}

// Admin Check
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

module.exports = function(robot) {

  // ADD USER TO JABBER
  robot.respond(/invite (.*)/i, function(msg) {
    var admin = isAdmin(msg.message.user.id.toString());
    var user, pass;
    user = msg.match[1];
    pass = makePass();

    if (admin === true) {
      child = exec('sudo ejabberdctl register ' + user + ' wiredcraft.teamchat.io ' + pass + ' && sudo ejabberdctl srg_user_add ' + user + ' wiredcraft.teamchat.io Wiredcraft wiredcraft.teamchat.io',
        function(error, stdout, stderr) {
          msg.send(stdout, stderr);
          if (error !== null) {
            msg.send('exec error: ' + error);
          } else {
            msg.send('Password is ' + pass + '')
          }
        }
      )
    } else {
      return msg.send('Only admins can invite new users.')
    }

  });


  // REMOVE USER FROM JABBER
  robot.respond(/kick (.*)/i, function(msg) {
    var admin = isAdmin(msg.message.user.id.toString());
    var user;
    kicking = true;
    user = msg.match[1];

    if (admin === true) {
      msg.send('Kicking in 10 seconds. \n Type "/abort" or "borat abort" to cancel.');
    } else {
      return msg.send('Only admins can kick a user.')
    }

    robot.respond(/abort/i, function(msg) {
      if (kicking && admin) {
        msg.send('Kicking ' + user + ' aborted');
        abort = true;
      } else {
        msg.send('Nothing to abort');
      }
    });

    if (admin === true) {
      setTimeout(function() {
        if (abort) {
          abort = false;
        } else {
          msg.send('Kicking...');
          child = exec('sudo ejabberdctl srg_user_del ' + user +' wiredcraft.teamchat.io Wiredcraft wiredcraft.teamchat.io && sudo ejabberdctl unregister ' + user + ' wiredcraft.teamchat.io',
            function(error, stdout, stderr) {
              msg.send(stdout, stderr);
              if (error !== null) {
                msg.send('exec error: ' + error);
              } else {
                msg.send('' + user + ' has been kicked.');
              }
            }
          )
        }
        kicking = false;
      }, 10000)
    }

  });


  // EXAMPLE
  // robot.respond(/cmd example/i, function(msg) {
    
  //   child = exec('ls -lh /usr',
  //     function(error, stdout, stderr) {
  //       msg.send(stdout, stderr, 'wooohoooo');
  //       if (error !== null) {
  //         msg.send('exec error ' + error);
  //       } else {
  //         msg.send('Completed with no errors.'); // include if nothing is returned by the command
  //       }
  //     }
  //   )

  // });

};