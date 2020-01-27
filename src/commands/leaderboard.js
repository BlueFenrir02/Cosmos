// Libraries
const fs = require('fs');

// Command
module.exports = {
	name: 'leaderboard',
    description: 'Get the credit leaderboard!',
    args: false,
    usage: '',
	execute(message) {
        // Variables
        const data = readData(message.guild.id)
        let leaderboard = [];
        let embed = new Discord.RichEmbed();
        // Errors
        if(data === undefined) return message.channel.send("\:satellite: Wasn't able to fetch data, <@" + message.author.id + ">!");
        // Execute
        embed.setColor("#ff0000");
        embed.setTitle("LEADERBOARD");
        embed.setThumbnail('https://pngimage.net/wp-content/uploads/2018/06/leaderboard-icon-png-7.png');
        for(const id in data) leaderboard.push({id: id, balance: data[id].balance});
        leaderboard.sort((a, b) => (a.balance <= b.balance));
        leaderboard.forEach((user, i) => embed.addField((i+1)+".", "<@" + user.id + ">  |  " + data[user.id].balance + " credits"));
        
        return message.channel.send(embed);
	}
};