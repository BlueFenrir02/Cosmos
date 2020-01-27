// Command
module.exports = {
	name: 'send',
    description: 'Send money to another user!',
    args: true,
    usage: '<amount> <user>',
	execute(message, args) {
        // Variables
        const member = message.mentions.members.first();
        const amount = parseFloat(args[0]);
        // Errors
        if(isNaN(amount)) return message.channel.send("\:no_entry_sign: Credit amount should be a number, <@" + message.author.id + ">!");
        if(member === undefined || !client.guilds.get(message.guild.id).member(member.id)) return message.channel.send("\:no_entry_sign: That person does not exists or is not in this server, <@" + message.author.id + ">!");
        if(amount < 0) return message.channel.send("\:no_entry_sign: Can't send a negative amount of credits, <@" + message.author.id + ">!");
        if(amount > readData(message.guild.id, message.author.id, "balance")) return message.channel.send("\:moneybag: Your balance is too low, <@" + message.author.id + ">!");
        // Execute
        addData(message.guild.id, member.id, "balance", parseFloat(readData(message.guild.id, member.id, "balance")) + amount);
        addData(message.guild.id, message.author.id, "balance", parseFloat(readData(message.guild.id, message.author.id, "balance")) - amount);
        message.channel.send("\:money_with_wings: <@" + message.author.id + "> sent <@" + member.user.id + "> " + amount + " credits!");
	}
};