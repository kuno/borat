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

    // Only admins can delete storage
    robot.respond(/storage delete (\w*)$/i, function(msg) {
        admin = isAdmin(msg.message.user.id.toString());
        if(admin === true) {
            delete robot.brain.data[msg.match[1]];
            return msg.send("" + msg.match[1] + " deleted from storage.");
        } else {
            return msg.send("Admins only!");
        }
    });
    
    // Example of testing for admin
    robot.respond(/am I admin?/i, function(msg) {
        admin = isAdmin(msg.message.user.id.toString());
        if(admin === true) {
            msg.send('You are indeed an admin.');
        } else {
            msg.send('You are not an admin.');
        }
    });

};