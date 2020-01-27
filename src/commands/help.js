// Libraries
const Discord = require('discord.js');

// Command
module.exports = {
	name: 'help',
    description: 'Get info about a specific command or get a list of all available commands!',
    args: false,
    usage: '*command* or *nothing*',
	execute(message, args) {
        if(args.length == 0) {
            let commandList = "**All commands:** \n";
            client.commands.tap(e => commandList += "*" + e.name + "*\n");
            return message.channel.send(commandList);
        } else {
            const commandObject = client.commands.get(args[0].toLowerCase());
            if(commandObject === undefined) return message.reply("Command not found!");
            const embed = new Discord.RichEmbed()
                .setColor('#FFA500')
                .setTitle(commandObject.name)
                .addField('Description', commandObject.description)
                .addField('Format', message.content[0] + commandObject.name + " " + commandObject.usage);
            return message.channel.send(embed);
        }
	}
};