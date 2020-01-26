// Libraries
const request = require('request');

// Command
module.exports = {
	name: 'meme',
    description: 'Get a random meme!',
    args: false,
    usage: '',
	execute(message, args) {
        request({
            url: 'https://meme-api.herokuapp.com/gimme',
            json: true
        },
        function(e, r, body) {
            if(e === null) {
                return message.channel.send({files: [body.url]});
            } else {
                console.log(e);
                return message.reply("Error!");
            }
        });
	}
};