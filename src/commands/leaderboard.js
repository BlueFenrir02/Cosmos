// Libraries
const fs = require('fs');

// Command
module.exports = {
	name: 'leaderboard',
    description: 'Get the credit leaderboard!',
    args: false,
    usage: '',
	execute(message, args) {
        const data = JSON.parse(fs.readFileSync('./data.json'))[message.guild.id];
        let leaderboard = [];
        let string = "LEADERBOARD\n----------\n";

        for(let id in data) leaderboard.push({id: id, balance: data[id].balance});
        leaderboard.sort((a, b) => (a.balance <= b.balance));

        leaderboard.forEach((user, i) => {
            if(i >= 9) return;
            string += (i+1) + ". <@" + user.id + ">  |  " + data[user.id].balance + " credits\n";
        });

        return message.channel.send(string);
	}
};