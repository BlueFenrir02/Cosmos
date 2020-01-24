module.exports = {
	name: 'kick',
    description: 'Kicks a member!',
    args: true,
    usage: '<user> <reason>',
	execute(message, args) {
        const member = message.mentions.members.first();
        if(member.kickable && message.member.hasPermission('ADMINISTRATOR')) {
            const reason = args.slice(1).join(' ');
            member.kick(reason);
            return message.reply("Kicked " + member.user.tag + " for " + reason);
        } else {
            return message.reply("Can't kick " + member.user.tag);
        }
	}
};