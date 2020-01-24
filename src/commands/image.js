const request = require('request');
module.exports = {
	name: 'image',
    description: 'Search for a image!',
    args: true,
    usage: '<search>',
	execute(message, args) {
        request({
            url: 'https://pixabay.com/api/?key=15021305-24a039485a0548601948251b0&q='+args.join('+')+'&image_type=photo',
            json: true
        },
        function(e, r, body) {
            if(e === null) {
                if(body.hits.length === 0) {
                    return message.reply("No images found!");
                } else {
                    const image = body.hits[Math.floor(Math.random() * (body.hits.length))].largeImageURL;
                    return message.channel.send(
                        "Out of " + body.total + " images, this is my favorite:", 
                        {files: [image]}
                    );
                }
            } else {
                console.log(e);
                return message.reply("Error!");
            }
        });
	}
};