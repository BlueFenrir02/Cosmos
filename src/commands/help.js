// Libraries
const Discord = require('discord.js');

// Command
module.exports = {
	name: 'help',
    description: 'Get info about a specific command or get a list of all available commands!',
    args: false,
    usage: '<command> or <nothing>',
	execute(message, args) {
        // Variables
        let embed = new Discord.RichEmbed();
        // Execute
        embed.setColor("#ff0000");
        if(!args.length) {
            embed.setTitle("Command list");
            client.commands.tap(e => embed.addField(e.name, e.description));
        } else {
            // Variables
            const commandObject = client.commands.get(args[0].toLowerCase());
            // Errors
            if(commandObject === undefined) return message.channel.send("\:no_entry_sign: Command was not found, <@" + message.author.id + ">!");
            // Execute
            embed.setTitle(commandObject.name);
            embed.addField('Description', commandObject.description);
            embed.addField('Format', message.content[0] + commandObject.name + " " + commandObject.usage);   
        }
        return message.channel.send(embed);
	}
};