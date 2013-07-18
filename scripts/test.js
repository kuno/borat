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

    robot.respond(/storage delete (\w*)$/i, function(msg) {
        if(isAdmin(msg.message.user.id.toString()) === true) {
            delete robot.brain.data[msg.match[1]];
            return msg.send("" + msg.match[1] + " deleted from storage.");
        } else {
            return msg.send("Sorry, that is an admin only command");
        }
    });
    
    // Example of testing for admin
    robot.respond(/am I admin?/i, function(msg) {
        admin = isAdmin(msg.message.user.id.toString());
        if(admin === true) {
            msg.send('You are indeed an admin.');
        } else {
            msg.send('Sorry, you are not an admin.');
        }
    });

};