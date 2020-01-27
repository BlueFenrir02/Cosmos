// Command
module.exports = {
	name: 'send',
    description: 'Send money to another user!',
    args: true,
    usage: '<amount> <user>',
	execute(message, args) {
        const member = message.mentions.members.first();
        const amount = parseFloat(args[0]);
        if(amount >= 0) {
            addData(message.guild.id, member.id, "balance", parseFloat(readData(message.guild.id, member.id, "balance")) + amount);
            addData(message.guild.id, message.author.id, "balance", parseFloat(readData(message.guild.id, message.author.id, "balance")) - amount);
            return message.channel.send("@" + message.author.tag + " sent @" + member.user.tag + " " + amount + " credits!");
        } else {
            return message.reply("Balance is too low!");
        }
	}
};