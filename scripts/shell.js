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
//   hubot cmd - a commands
//
// Author:
//   Jamesford

module.exports = function(robot) {
  var util = require('util'),
      exec = require('child_process').exec,
      child;

  // EXAMPLE OF RUNNING CMD LINE FROM HUBOT
  robot.respond(/cmd example/i, function(msg) {

    child = exec('ls -lh /usr   ',
      function(error, stdout, stderr) {
        console.log('stdout ' + stdout);
        // console.log('stderr ' + stderr);
        return msg.send(stdout);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
      })

  });

  // ADD USER TO JABBER
  robot.respond(/cmd add (.*) (.*)/i, function(msg) {
    var user, pass;
    user = msg.match[1];
    pass = msg.match[2];

    msg.reply('Username - ' + user);
    msg.reply('Password - ' + pass);

    child = exec('sudo ejabberdctl register ' + user + ' wiredcraft.teamchat.io ' + pass + '',
      function(error, stdout, stderr) {
        console.log('stdout ' + stdout);
        // console.log('stderr ' + stderr);
        return msg.send(stdout);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
      })

  });

  // REGISTER USER ON JABBER
  robot.respond(/cmd register (.*)/i, function(msg) {
    var user;
    user = msg.match[1];

    msg.reply('Username - ' + user);

    child = exec('sudo ejabberdctl srg_user_add ' + user + ' wiredcraft.teamchat.io Wiredcraft wiredcraft.teamchat.io',
      function(error, stdout, stderr) {
        console.log('stdout ' + stdout);
        // console.log('stderr ' + stderr);
        return msg.send(stdout);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
      })

  });

  // REMOVE USER FROM JABBER
  robot.respond(/cmd remove (.*)/i, function(msg) {
    var user;
    user = msg.match[1];

    msg.reply('Username - ' + user);

    child = exec('sudo ejabberdctl srg_user_del ' + user +' wiredcraft.teamchat.io Wiredcraft wiredcraft.teamchat.io',
      function(error, stdout, stderr) {
        console.log('stdout ' + stdout);
        // console.log('stderr ' + stderr);
        return msg.send('stdout' + stdout);
        if (error !== null) {
          console.log('exec error ' + error);
        }
      })

  });

  // UNREGISTER USER FROM JABBER
  robot.respond(/cmd unregister (.*)/i, function(msg) {
    var user;
    user = msg.match[1];

    msg.reply('Username - ' + user);

    child = exec('sudo ejabberdctl unregister ' + user + ' wiredcraft.teamchat.io',
      function(error, stdout, stderr) {
        console.log('stdout ' + stdout);
        // console.log('stderr ' + stderr);
        return msg.send('stdout ' + stdout);
        if (error !== null) {
          console.log('exec error ' + error);
        }
      })

  });

  // RUN TESTS OR WHATEVER HERE
  robot.respond(/cmd test (.*) (.*)/i, function(msg) {
    var one, two, three, four;
    one = msg.match[1];
    two = msg.match[2];

    msg.reply('You said ' + one + ' ' + two);
  });

};