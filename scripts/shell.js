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
    child, abort;

function makePass() {
  var x = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 8; i++) {
    x += possible.charAt(Math.floor(Math.random() * possible.length));
  };
  return x;
}

module.exports = function(robot) {

  // ADD USER TO JABBER
  robot.respond(/invite (.*)/i, function(msg) {
    var user, pass;
    user = msg.match[1];
    pass = makePass();

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

  });


  // REMOVE USER FROM JABBER
  robot.respond(/kick (.*)/i, function(msg) {
    var user, kicking;
    kicking = true;
    user = msg.match[1];

    msg.send('Kicking in 10 seconds. \n Type "abort" to cancel.');
    
    robot.hear(/abort/i, function(msg) {
      msg.send(kicking + ' - kicking value');
      if (kicking) {
        msg.send('Kicking ' + user + ' aborted');
        abort = true;
      } else {
        msg.send('Nothing to abort');
      }
    });

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
      msg.send(kicking + ' - kicking value');
    }, 10000)

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