// Libraries
const request = require('request'); 

// Command
module.exports = {
	name: 'chucknorris',
    description: 'Get a random *Chuck Norris* joke!',
    args: false,
    usage: '',
	execute(message, args) {
		request({
            url: 'http://api.icndb.com/jokes/random',
            json: true
        },
        function(e, r, body) {
            if(e === null) {
                return message.channel.send("> *" + body.value.joke.replace("&quot;", "\"").replace("&quot;", "\"") + "*");
            } else {
                return message.reply("Unknown error!");
            }
        });
	}
};