# Borat Bot

After cloning the repo and before doing anything else, `cd` into `borat` and `npm install`. Node.js and npm are required. After this run the `run.sh` file to start borat up.

See [markstory/hubot-xmpp](https://github.com/markstory/hubot-xmpp) for full documentation of the XMPP adapter.

### Things to keep in mind

- All scripts inside `node_modules/hubot-scripts/.../.../` cannot be tweaked and saved without moving them to the `/scripts` directory.

- More to come...



### Commands
Text inside `(here)` can be ommited. While `borat whats (this|that)` means you can say `borat whats this` or `borat whats that` for the command to work.

For a fully up to date list of commands use `borat help` wherever borat is listening.


- `repo#nnn` - Returns a link to an Issue within a repo belonging to Wiredcraft.

- `brb` - Lets Borat know you're away, he'll welcome you back when you come back :D

- `hi borat` or `hey borat` - Borat will greet you. *Warning* he can be a dick about it.

- `borat die` - Kills Borat. It's ok though, we can revive him if needed.

- `borat echo <text>` - Stop repeating yourself!

- `borat image (me) <query>` - Fetch an image of your query.

- `borat animate (me) <query>` - Same as above, but tries to fetch an animated GIF.

- `borat map (me) <query>` - Fetches a map of the area stated in your query.

- `borat mustache (me) <url> or <query>` - Add a mustache to a picture. What isn't better with a mustache?

- `borat time` - Time for you to get a watch! Unless your happy with knowing the server time.

- `borat the (3) (rules|laws)` - Make sure that robot doesn't forget them!

- `borat the rules for developers` - We have rules too!

- `borat <user> (message|m) <message goes here>` - Borat will hold your message for user. Message cannot start with "Message or message."

- `borat list m` - List all messages in queue.

- `borat my m` - Show messages sent to me.

- `borat clear m` - Clear message queue.

- `borat status <your status>` - Set your current status.

- `borat clear s` - Removes your status.

- `borat list s` - Lists status for each user.

- `borat invite <name>` - Adds user to jabber and generates a random password.

- `borat kick <name>` - Removes user from jabber, deletes the account. Can be aborted within 10 seconds.

### References

- [Hubot Documentation](https://github.com/github/hubot#hubot)
- [XMPP Adapter for Hubot](https://github.com/markstory/hubot-xmpp)
- [Hubot Scripts Catalog](http://hubot-script-catalog.herokuapp.com/)
- [Hubot-Scripts Repo](https://github.com/github/hubot-scripts#hubot-scripts)