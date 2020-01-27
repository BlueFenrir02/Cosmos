// Libraries
const request = require('request');

// Command
module.exports = {
	name: 'marsrover',
    description: 'Get the latest images from the rovers on Mars!',
    args: false,
    usage: '',
	execute(message, args) {
        // Variables
        const rovers = ['curiosity', 'spirit', 'opportunity'];
        // Execute
        request({url: 'https://mars-photos.herokuapp.com/api/v1/rovers/' + rovers[Math.floor(Math.random() * 3)] + '/latest_photos', json: true},
        function(e, r, body) {
            // Errors
            if(e) {
                console.error("ERROR: Marsrover command!\n\n" + e);
                return message.channel.send("\:satellite: Wasn't able to fetch image, <@" + message.author.id + ">!");
            }
            // Variables
            const index = Math.floor(Math.random() * body.latest_photos.length);
            const image = body.latest_photos[index].img_src;
            // Execute
            return message.channel.send(
                "Taken by \"**" + body.latest_photos[index].rover.name + "**\" with its \"*" + body.latest_photos[index].camera.full_name + "*\":",
                {files: [image]},
            );        
        });
	}
};