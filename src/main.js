// Libraries
const secret = require('./config.json');
const Discord = require('discord.js');
const fs = require('fs');

// Create bot
global.client = new Discord.Client();

// Load commands
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require('./commands/'+file);
    client.commands.set(command.name, command);
}

// Functions
global.addData = (guildID, memberID, propName, propValue, override=true) => { // Add data to data.json
    if(!fs.existsSync('./data.json')) fs.writeFileSync('./data.json', JSON.stringify({}));
    let object = JSON.parse(fs.readFileSync('./data.json'));
    if(!object.hasOwnProperty(guildID)) object[guildID] = {};
    if(!object[guildID].hasOwnProperty(memberID)) object[guildID][memberID] = {};
    if(override) object[guildID][memberID][propName] = propValue;
    if(!override && !object[guildID][memberID].hasOwnProperty(propName)) object[guildID][memberID][propName] = propValue;
    fs.writeFileSync('./data.json', JSON.stringify(object));
}

global.readData = (guildID, memberID, propName) => {
    try {
        return JSON.parse(fs.readFileSync('./data.json'))[guildID][memberID][propName];
    } catch(e) {
        return message.reply("Error reading data!");
    }
}

// Check if ready
client.on('ready', () => {
    // Create data.json
    client.guilds.tap(guild => {
        guild.members.tap(member => {
            addData(guild.id, member.id, "balance", 5000, false);
        });
    });
    
    // Other
    client.user.setActivity('?help help');
    console.log("Online!");
});

// Join event
client.on('guildMemberAdd', member => {
    addData(member.guild.id, member.id, "balance", 5000, false);
});

// Message event
client.on('message', message => {
    // Add balance
    addData(message.guild.id, message.author.id, "balance", parseFloat(readData(message.guild.id, message.author.id, "balance") + 1));

    // Split
    if(!message.content.startsWith(secret.prefix) || message.author.bot) return;
    const args = message.content.slice(secret.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    if(!client.commands.has(commandName)) return;

    // Retrieve command
    const command = client.commands.get(commandName);
    if(command.args && !args.length) {
        let reply = "Missing arguments!";
        if(command.usage) {
            reply += "\nFormat: `" + secret.prefix + command.name + " " + command.usage + "`";
        }
        return message.channel.send(reply);
    }
    
    // Execute command
    try {
        command.execute(message, args);
    } catch(e) {
        console.error(e);
        message.reply("Error!");
    }
});

// Login
client.login(secret.token);