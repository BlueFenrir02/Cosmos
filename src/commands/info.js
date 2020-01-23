module.exports = {
	name: 'info',
    description: 'Retrieves info about a member.',
    args: true,
    usage: '<user>',
	execute(message, args) {
        const member = message.mentions.members.first();
        const embed = new Discord.RichEmbed()
            .setColor('#FFA500')
            .setTitle(member.user.tag)
            .setThumbnail(member.user.avatarURL)
            .addField('ID', member.id)
            .addField('Presence', member.user.presence.status)
            .addField('Joined this server', member.joinedAt)
            .addField('Created this account', member.user.createdAt);
        message.channel.send(embed);
	}
};