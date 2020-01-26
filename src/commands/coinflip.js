// Libraries
const fs = require('fs');
const { prefix } = require('../config.json');

// Command
module.exports = {
	name: 'coinflip',
    description: 'Coinflip against the house or a user!',
    args: false,
    usage: '<user> or <empty>',
	execute(message, args) {
        // Variables
        const self = message.author;
        const opponent = message.mentions.members.first().user;
        const won = Math.floor(Math.random() * 2); // int value being used as bool (0 or 1)
        const amount = parseFloat(args[0]);
        let data = JSON.parse(fs.readFileSync('./data.json'));

        if(data[message.guild.id][self.id].balance < amount || amount <= 0) {
            return message.reply("Balance too low!");
        }
        
        // Betting against the house
        if(opponent === undefined) { 
            data[message.guild.id][self.id].balance += (won ? amount : -amount);
            message.reply("You " + (won ? "won " : "lost ") + amount + " coins!");
        } 
        
        // Betting against another user
        else {
            if(data[message.guild.id][opponent.id].bet["opponentID"] === self.id && amount === data[message.guild.id][opponent.id].bet.amount) { // Check if bet exists
                // Execute bet
                data[message.guild.id][self.id].balance += (won ? amount : -amount);
                data[message.guild.id][opponent.id].balance -= (won ? amount : -amount);
                message.channel.send((won ? self.username : opponent.username) + " won " + amount + " credits!");
                data[message.guild.id][opponent.id].bet = {}; // Clear bet
            } else {
                // Create bet
                data[message.guild.id][self.id].bet = {
                    opponentID: opponent.id,
                    amount: amount
                };
                message.channel.send("Created bet! " + opponent.username + ", type `" + prefix + "coinflip " + amount + " @" + self.tag + "` to accept!");
            }
        }
        return fs.writeFileSync('./data.json', JSON.stringify(data));
	}
};

/*

! Ideas:
! Have a reaction (emoji) to the bet invite instead of having to type it in manually.

*/