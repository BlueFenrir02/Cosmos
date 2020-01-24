module.exports = {
	name: 'help',
    description: 'Uhh..',
    args: true,
    usage: '<commandName> or <all>',
	execute(message, args) {
        if(args[0] === "all") {
            client.commands.tap(commandObject => { sendCommandEmbed(commandObject); });
        } else {
            const commandObject = client.commands.get(args[0].toLowerCase());
            if(commandObject === undefined) return message.reply("Command not found!");
            sendCommandEmbed(commandObject);
        }

        function sendCommandEmbed(command) {
            const embed = new Discord.RichEmbed()
                .setColor('#FFA500')
                .setTitle(command.name)
                .addField('Description', command.description)
                .addField('Format', message.content[0] + command.name + " " + command.usage);
            message.channel.send(embed);
        }
	}
};