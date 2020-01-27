// Command
module.exports = {
	name: 'kick',
    description: 'Kick a user!',
    args: true,
    usage: '<user> <reason>',
	execute(message, args) {
        // Variables
        const member = message.mentions.members.first();
        // Errors 
        if(member === undefined || !client.guilds.get(message.guild.id).member(member.id)) return message.channel.send("\:no_entry_sign: That person does not exists or is not in this server, <@" + message.author.id + ">!");
        if(!member.kickable) return message.channel.send("\:no_entry_sign: <@" + member.id + "> is not kickable, <@" + message.author.id + ">!");
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("\:no_entry_sign: You don't have access to kick users, <@" + message.author.id + ">!");
        // Execute
        const reason = args.slice(1).join(' '); // Link reason arguments together
        member.kick(reason);
        return message.channel.send("\:hammer: Kicked <@" + member.user.id + ">" + (reason.length ? " for " + reason : "") + "!");
	}
};