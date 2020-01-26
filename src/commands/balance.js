// Command
module.exports = {
	name: 'balance',
    description: 'Get someones credit balance!',
    args: true,
    usage: '<user>',
	execute(message, args) {
        const member = message.mentions.members.first();
        const amount = readData(message.guild.id, member.id, "balance");
        return message.channel.send(member.user.username + " has " + amount + " credits!");
	}
};