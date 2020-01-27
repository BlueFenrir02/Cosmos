// Command
module.exports = {
	name: 'balance',
    description: 'Get someones credit balance!',
    args: false,
    usage: '<user> or <empty>',
	execute(message, args) {
        const member = (args.length ? message.mentions.members.first().user : message.author);
        const amount = readData(message.guild.id, member.id, "balance");
        
        return message.channel.send("<@" + member.id + "> has " + amount + " credits!");
	}
};