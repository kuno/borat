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

  robot.respond(/cmd example/i, function(msg) {
    var util  = require('util'),
        spawn = require('child_process').spawn,
        ls    = spawn('ls', ['-lh', '/usr']);

    ls.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
      return msg.send('stdout: ' + data);
    });

    ls.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
      return msg.send('stderr ' + data);
    });

    ls.on('exit', function (code) {
      console.log('child process exited with code ' + code);
      return msg.send('child process exited with code ' + code);
    });

  });

  robot.respond(/test/i, function(msg) {
    var util = require('util'),
        spawn = require('child_process').spawn,
        cmd = spawn('sudo', ['ejabberdctl', 'register', 'Archer', 'wiredcraft.teamchat.io', 'P@ssword']);

    cmd.stdout.on('data', function (data) {
      return msg.send('stdout: ' + data);
    });

    cmd.stderr.on('data', function (data) {
      return msg.send('stderr: ' + data);
    });

    cmd.on('exit', function (code) {
      return msg.send('child process exited with code' + code)
    });
  });

  robot.respond(/test2/i, function(msg) {
    var util = require('util'),
        spawn = require('child_process').spawn,
        cmd = spawn('sudo', ['ejabberdctl', 'srg_user_add', 'Archer', 'wiredcraft.teamchat.io', 'Wiredcraft', 'wiredcraft.teamchat.io']);

    cmd.stdout.on('data', function (data) {
      return msg.send('stdout: ' + data);
    });

    cmd.stderr.on('data', function (data) {
      return msg.send('stderr: ' + data);
    });

    cmd.on('exit', function (code) {
      return msg.send('child process exited with code' + code)
    });
  });

};