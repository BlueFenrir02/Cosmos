// Command
module.exports = {
	name: 'coinflip',
    description: 'Make a coinflip bet with your credits!',
    args: true,
    usage: '<amount>',
	execute(message, args) {
        // Variables
        const amount = parseFloat(args[0]);
        const won = Math.floor(Math.random() * 2);
        const balance = readData(message.guild.id, message.author.id, "balance");
        // Errors
        if(isNaN(amount)) return message.channel.send("\:no_entry_sign: Credit amount should be a number, <@" + message.author.id + ">!");
        if(amount < 0) return message.channel.send("\:no_entry_sign: Can't bet a negative amount of credits, <@" + message.author.id + ">!");
        if(amount > balance) return message.channel.send("\:moneybag: Your balance is too low, <@" + message.author.id + ">!");
        // Execute
        addData(message.guild.id, message.author.id, "balance", (won ? balance + amount : balance - amount));
        return message.channel.send("<@" + message.author.id + ">" + (won ? " won " : " lost ") + amount + " credits!");
	}
};