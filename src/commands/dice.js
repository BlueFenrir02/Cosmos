module.exports = {
	name: 'dice',
    description: 'Roll a dice!',
    args: false,
    usage: '<amount>',
	execute(message, args) {
        message.channel.send("Out of order!");
        /*
        // Variables
        const amount = parseFloat(args[0]);
        const dice = Math.floor(Math.random() * 6)+1;
        const won = Math.floor(Math.random() * 2);
        const balance = readData(message.guild.id, message.author.id, "balance");
        // Execute
        if(won === 1){
            addData(message.guild.id, message.author.id, "balance", balance - dice * amount);
            return message.reply("You lost " + dice * amount + " credits!" + " You rolled " + dice);
        }
        else if(amount <= balance/6 && amount >= 0 && amount <= 10000) {
            addData(message.guild.id, message.author.id, "balance", balance + dice * amount);
            return message.reply("You won " + dice * amount + " credits!" + " You rolled " + dice);
        } else { return message.reply("Balance is too low!"); }
        */
	}
};
