// Libraries
const Discord = require('discord.js');

// Command
module.exports = {
	name: 'info',
    description: 'Get info about a user!',
    args: true,
    usage: '<user>',
	execute(message, args) {
        // Variables
        const member = message.mentions.members.first();
        const status = (member.user.presence.game === null) ? member.user.presence.status : "playing " + member.user.presence.game.name;
        // Errors
        if(member === undefined || !client.guilds.get(message.guild.id).member(member.id)) return message.channel.send("\:no_entry_sign: That person does not exists or is not in this server, <@" + message.author.id + ">!");
        // Execute
        const embed = new Discord.RichEmbed()
            .setColor('#FFA500')
            .setTitle(member.user.tag)
            .setThumbnail(member.user.avatarURL)
            .addField('ID', member.id)
            .addField('Presence', status)
            .addField('Joined this server', member.joinedAt)
            .addField('Created this account', member.user.createdAt);
        return message.channel.send(embed);
	}
};