// Libraries
const fs = require('fs');

// Command
module.exports = {
	name: 'balance',
    description: 'Get someones credit balance!',
    args: true,
    usage: '<user>',
	execute(message, args) {
        const member = message.mentions.members.first();
        let data = JSON.parse(fs.readFileSync('./data.json'));
        return message.channel.send(member.user.username + " has " + data[message.guild.id][member.id].balance + " credits!");
	}
};