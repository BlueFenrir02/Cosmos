// Command
module.exports = {
	name: 'ban',
    description: 'Bans a member!',
    args: true,
    usage: '<user> <reason>',
	execute(message, args) {
        const member = message.mentions.members.first();
        
        if(member.bannable && message.member.hasPermission('ADMINISTRATOR')) {
            const reason = args.slice(1).join(' '); // Link reason arguments together
            member.ban(reason);
            return message.reply("Banned <@" + member.user.id + "> for " + reason);
        } else {
            return message.reply("Can't ban <@" + member.user.id + ">");
        }
	}
};