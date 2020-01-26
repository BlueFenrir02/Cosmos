// Libraries
const request = require('request');

// Command
module.exports = {
	name: 'marsrover',
    description: 'Get the latest images from the rovers on Mars!',
    args: false,
    usage: '',
	execute(message, args) {
        const rovers = ['curiosity', 'spirit', 'opportunity'];
		request({
            url: 'https://mars-photos.herokuapp.com/api/v1/rovers/' + rovers[Math.floor(Math.random() * 3)] + '/latest_photos',
            json: true
        },
        function(e, r, body) {
            if(e === null) {
                const index = Math.floor(Math.random() * body.latest_photos.length);
                const image = body.latest_photos[index].img_src;
                return message.channel.send(
                    "Taken by \"**" + body.latest_photos[index].rover.name + "**\" with its \"*" + body.latest_photos[index].camera.full_name + "*\":",
                    {files: [image]},
                );
            } else {
                console.log(e);
                return message.reply("Error!");
            }
        });
	}
};