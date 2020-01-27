// Command
module.exports = {
	name: 'coinflip',
    description: 'Make a coinflip bet with your credits!',
    args: true,
    usage: '*amount*',
	execute(message, args) {
        const amount = parseFloat(args[0]);
        const won = Math.floor(Math.random() * 2);
        const balance = readData(message.guild.id, message.author.id, "balance");
        if(balance >= amount && amount >= 0) {
            addData(message.guild.id, message.author.id, "balance", (won ? balance + amount : balance - amount));
            return message.reply("You " + (won ? "won " : "lost ") + amount + " credits!");
        } else { return message.reply("Balance is too low!"); }
	}
};