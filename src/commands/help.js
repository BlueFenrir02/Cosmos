module.exports = {
	name: 'help',
    description: 'Uhh..',
    args: false,
    usage: '<commandName>',
	execute(message, args) {
        if(args.length == 0) {
            let commandList = "**All commands:** \n";
            client.commands.tap(e => commandList += "*" + e.name + "*\n");
            message.channel.send(commandList);
        } else {
            const commandObject = client.commands.get(args[0].toLowerCase());
            if(commandObject === undefined) return message.reply("Command not found!");
            const embed = new Discord.RichEmbed()
                .setColor('#FFA500')
                .setTitle(commandObject.name)
                .addField('Description', commandObject.description)
                .addField('Format', message.content[0] + commandObject.name + " " + commandObject.usage);
            embeds.push(embed);
        }
	}
};