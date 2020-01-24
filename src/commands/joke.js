module.exports = {
	name: 'joke',
    description: 'Get a random joke!',
    args: false,
    usage: '',
	execute(message, args) {
        request({
            url: 'https://sv443.net/jokeapi/category/dark',
            json: true
        },
        function(e, r, body) {
            if(e === null) {
                if(body.type === 'single') {
                    return message.channel.send("> *" + body.joke + "*");
                } else {
                    return message.channel.send("> " + body.setup + "\n> *- " + body.delivery + "*");
                }
            } else {
                console.log(e);
                return message.reply("Error!");
            }
        });
	}
};