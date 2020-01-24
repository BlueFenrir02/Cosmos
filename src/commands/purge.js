module.exports = {
	name: 'purge',
    description: 'Deletes <x> amount of messages.',
    args: true,
    usage: '<x>',
	execute(message, args) {
        const amount = parseInt(args[0], 10);
        if(amount > 99) {
            return message.reply("Max amount is 99!");
        } else {
            message.channel.bulkDelete(amount + 1);
            return message.reply("Deleted " + amount + " messages!");
        }
	}
};