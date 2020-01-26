// Setup
const { prefix, token } = require('./config.json');
global.Discord = require('discord.js');
global.request = require('request');

// Create bot
global.client = new Discord.Client();

// Load commands
const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require('./commands/'+file);
    client.commands.set(command.name, command);
}

// Check if ready
client.on('ready', () => {
    // Create and verify data.json
    if(!fs.existsSync('./data.json')) fs.writeFileSync('./data.json', JSON.stringify({}));
    let object = JSON.parse(fs.readFileSync('./data.json'));
    client.guilds.tap(guild => {
        if(!object.hasOwnProperty(guild.id)) object[guild.id] = {};
        if(!object[guild.id].hasOwnProperty('credits')) object[guild.id]['credits'] = {};
        guild.members.tap(member => {
            if(!object[guild.id]['credits'].hasOwnProperty(member.id)) object[guild.id]['credits'][member.id] = { balance: 5000 };
            if(!object[guild.id].hasOwnProperty('bets')) object[guild.id]['bets'] = {};
        });    
    });
    fs.writeFileSync('./data.json', JSON.stringify(object));
    
    // Other
    client.user.setActivity('?help help');
    console.log("Online!");
});

// Trigger event
client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    if(!client.commands.has(commandName)) return;

    // Retrieve command
    const command = client.commands.get(commandName);
    if(command.args && !args.length) {
        let reply = "Missing arguments!";
        if(command.usage) {
            reply += "\nFormat: `" + prefix + command.name + " " + command.usage + "`";
        }
        return message.channel.send(reply);
    }

    // Execute
    try {
        command.execute(message, args);
    } catch(e) {
        console.error(e);
        message.reply("Error!");
    }
});

// Login
client.login(token);