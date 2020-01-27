// Libraries
const request = require('request'); 

// Command
module.exports = {
	name: 'meme',
    description: 'Get a random meme!',
    args: false,
    usage: '',
	execute(message) {
        // Execute
        request({
            url: 'https://meme-api.herokuapp.com/gimme',
            json: true
        },
        function(e, r, body) {
            // Errors
            if(e) {
                console.error("ERROR: Meme command!\n\n" + e);
                return message.channel.send("\:satellite: Wasn't able to fetch image, <@" + message.author.id + ">!");
            }
            // Execute
            return message.channel.send({files: [body.url]});
        });
	}
};