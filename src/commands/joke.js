// Libraries
const request = require('request');

// Command
module.exports = {
	name: 'joke',
    description: 'Get a random dark joke!',
    args: false,
    usage: '',
	execute(message) {
        // Execute
        request({
            url: 'https://sv443.net/jokeapi/category/dark',
            json: true
        },
        function(e, r, body) {
            // Errors
            if(e) {
                console.error("ERROR: Meme command!\n\n" + e);
                return message.channel.send("\:satellite: Wasn't able to fetch joke, <@" + message.author.id + ">!");
            }
            // Execute 
            if(body.type === 'single') return message.channel.send("> *" + body.joke + "*");
            else return message.channel.send("> " + body.setup + "\n> *- " + body.delivery + "*");
        });
	}
};