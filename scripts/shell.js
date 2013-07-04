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

};