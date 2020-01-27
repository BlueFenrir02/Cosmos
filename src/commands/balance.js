// Command
module.exports = {
	name: 'balance',
    description: 'Get the credit balance of yourself or someone else!',
    args: false,
    usage: '*user* or *nothing*',
	execute(message, args) {
        const member = (args.length ? message.mentions.members.first().user : message.author);
        const amount = readData(message.guild.id, member.id, "balance");
        
        return message.channel.send("<@" + member.id + "> has " + amount + " credits!");
	}
};