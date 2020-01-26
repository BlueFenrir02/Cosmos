module.exports = {
	name: 'balance',
    description: 'Get someones credit balance!',
    args: true,
    usage: '<user>',
	execute(message, args) {
        const fs = require('fs');
        const member = message.mentions.members.first();
        let data = JSON.parse(fs.readFileSync('./data.json'));
        return message.channel.send(member.user.username + " has " + data[message.guild.id].credits[member.id].balance + " credits!");
	}
};