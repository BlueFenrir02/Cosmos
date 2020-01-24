// Setup
global.Discord = require('discord.js');
global.client = new Discord.Client();
const { prefix, token } = require('./config.json');
const fs = require('fs');


// Load commands
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const command = require('./commands/'+file);
    client.commands.set(command.name, command);
}

// Check if ready
client.on('ready', () => {
    console.log("Online!");
    client.user.setActivity('god');
});

// Events
client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    if(!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if(command.args && !args.length) {
        let reply = "Missing arguments!";
        if(command.usage) {
            reply += "\nFormat: `" + prefix + command.name + " " + command.usage + "`";
        }
        return message.channel.send(reply);
    }

    try {
        command.execute(message, args);
    } catch(e) {
        console.error(e);
        message.reply("Error!");
    }
});

// Login
client.login(token);