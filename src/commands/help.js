module.exports = {
	name: 'help',
    description: 'Shows a list of commands if no arguments are given, or helps you with a specific command!',
    args: false, // Needs to be false in order to allow no arguments
    usage: '<commandName> or <empty>',
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