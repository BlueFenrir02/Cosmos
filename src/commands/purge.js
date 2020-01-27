// Command
module.exports = {
	name: 'purge',
    description: 'Delete *x* amount of messages!',
    args: true,
    usage: '<amount>',
	execute(message, args) {
        // Variables
        const amount = parseInt(args[0], 10);
        // Errors
        if(isNaN(amount)) return message.channel.send("\:no_entry_sign: Amount should be a number, <@" + message.author.id + ">!");
        if(amount < 0) return message.channel.send("\:no_entry_sign: Can't delete a negative amount of messages, <@" + message.author.id + ">!")
        if(amount > 100) return message.channel.send("\:no_entry_sign: Max amount is 100, <@" + message.author.id + ">!");
        // Execute
        message.channel.bulkDelete(amount);
        message.channel.send("\:bomb: Deleted " + amount + " messages, <@" + message.author.id + ">!");
	}
};