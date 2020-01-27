// Command
module.exports = {
	name: 'balance',
    description: 'Get the credit balance of yourself or someone else!',
    args: false,
    usage: '<user> or <nothing>',
	execute(message, args) {
        // Variables
        const member = (args.length ? message.mentions.members.first().user : message.author);
        const amount = readData(message.guild.id, member.id, "balance");
        // Errors
        //! Will never execute error because it's stuck on 'message.mentions.members.first().user', som er undefined
        if(member === undefined || !client.guilds.get(message.guild.id).member(member.id)) return message.channel.send("\:no_entry_sign: That person does not exists or is not in this server, <@" + message.author.id + ">!");
        // Execution
        return message.channel.send("<@" + member.id + "> has " + amount + " credits!");
	}
};