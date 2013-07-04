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
    child;

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

    if (pass !== undefined) {
      child = exec('sudo ejabberdctl register ' + user + ' wiredcraft.teamchat.io ' + pass + ' && sudo ejabberdctl srg_user_add ' + user + ' wiredcraft.teamchat.io Wiredcraft wiredcraft.teamchat.io',
        function(error, stdout, stderr) {
          msg.send(stdout, stderr);
          msg.send('Password is ' + pass + '')
          if (error !== null) {
            msg.send('exec error: ' + error);
          }
        }
      )
    } else {
      msg.send('Password is undefined \n Check the /scripts/shell.js file for errors');
    }

  });


  // REMOVE USER FROM JABBER
  robot.respond(/kick (.*)/i, function(msg) {
    var user;
    user = msg.match[1];

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