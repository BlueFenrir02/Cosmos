// Libraries
const request = require('request'); 

// Command
module.exports = {
	name: 'chucknorris',
    description: 'Get a random *Chuck Norris* joke!',
    args: false,
    usage: '',
	execute(message) {
		request({
            url: 'http://api.icndb.com/jokes/random',
            json: true
        },
        function(e, r, body) {
            // Errors
            if(e) {
                console.error("ERROR: Chucknorris command!\n\n" + e);
                return message.channel.send("\:satellite: Wasn't able to fetch joke, <@" + message.author.id + ">!");
            }
            // Execute
            return message.channel.send("> *" + body.value.joke.replace("&quot;", "\"").replace("&quot;", "\"") + "*");
        });
	}
};