// Libraries
const secret = require('./config.json');
global.Discord = require('discord.js');
const fs = require('fs');

// Create bot
global.client = new Discord.Client();

// Load commands
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require('./commands/'+file);
    client.commands.set(command.name, command); // Add to collection
}

// Functions
global.addData = (guildID, memberID, propName, propValue, override=true) => { // Add data to data.json
    try {
        // Create and/or get data.json
        if(!fs.existsSync('./data.json')) fs.writeFileSync('./data.json', JSON.stringify({}));
        let object = JSON.parse(fs.readFileSync('./data.json'));
        // Build data.json
        if(!object.hasOwnProperty(guildID)) object[guildID] = {};
        if(!object[guildID].hasOwnProperty(memberID)) object[guildID][memberID] = {};
        if(override) object[guildID][memberID][propName] = propValue;
        if(!override && !object[guildID][memberID].hasOwnProperty(propName)) object[guildID][memberID][propName] = propValue;
        // Write data.json
        fs.writeFileSync('./data.json', JSON.stringify(object));
    } catch(e) {
        return console.error("ERROR: Adding data!\n\n" + e);
    }
}

global.readData = (...layers) => {
    try {
        let data = JSON.parse(fs.readFileSync('./data.json'));
        layers.forEach(layer => data = data[layer]);
        return data;
    } catch(e) {
        return console.error("ERROR: Reading data!\n\n" + e);
    }
}

// Ready event
client.on('ready', () => {
    // Create data.json
    client.guilds.tap(guild => {
        guild.members.tap(member => {
            addData(guild.id, member.id, "balance", 5000, false);
        });
    });
    // Various
    client.user.setActivity('?help help');
    console.log("Online!");
});

// Join event
client.on('guildMemberAdd', member => {
    // Add initial balance to new member
    addData(member.guild.id, member.id, "balance", 5000, false);
});

// Message event
client.on('message', message => {
    // Add balance
    addData(message.guild.id, message.author.id, "balance", parseFloat(readData(message.guild.id, message.author.id, "balance") + 1));
    // Split command and arguments
    if(!message.content.startsWith(secret.prefix) || message.author.bot) return;
    const args = message.content.slice(secret.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    if(!client.commands.has(commandName)) return;
    // Retrieve command
    const command = client.commands.get(commandName);
    if(command.args && !args.length) {
        let reply = "Missing arguments!";
        if(command.usage) reply += "\nFormat: `" + secret.prefix + command.name + " " + command.usage + "`";
        return message.channel.send(reply);
    }
    // Execute command
    try {
        command.execute(message, args);
    } catch(e) {
        return console.error("ERROR: Command execution!\n\n" + e);
    }
});

// Login
try {
    client.login(secret.token);
} catch(e) {
    return console.error("ERROR: Client login!\n\n" + e);
}
