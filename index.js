const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const config = require("./src/config.js");
const { readdirSync } = require("fs");
const moment = require("moment");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const db = require("croxydb");

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.Guilds
    ],
    partials: [
        Partials.User,
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.GuildScheduledEvent,
        Partials.ThreadMember
    ]
});

let token = config.token;
client.commands = new Collection();
const rest = new REST({ version: '9' }).setToken(token);

const log = message => { 
    console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${message}`); 
};

// Chargement des commandes
const commandFiles = readdirSync('./src/commands').filter(file => file.endsWith('.js'));
const commands = [];

for (const file of commandFiles) {
    console.log(`Chargement de la commande : ${file}`);
    const command = require(`./src/commands/${file}`);
    if (command.data) {
        commands.push(command.data.toJSON());
        client.commands.set(command.data.name, command);
    } else {
        console.error(`Erreur avec le fichier : ${file}. Pas de propriété data.`);
    }
}

const eventFiles = readdirSync('./src/events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    console.log(`Chargement de l'événement : ${file}`);
    const event = require(`./src/events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

// Chargement des fichiers non-commande
const noCommandFiles = readdirSync('./src/nocommands').filter(file => file.endsWith('.js'));

for (const file of noCommandFiles) {
    console.log(`Chargement du script non-commande : ${file}`);
    const noCommand = require(`./src/nocommands/${file}`);
    if (noCommand.once) {
        client.once(noCommand.name, (...args) => noCommand.execute(...args, client));
    } else {
        client.on(noCommand.name, (...args) => noCommand.execute(...args, client));
    }
}
client.on("ready", async () => {
    try {
        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands },
        );
        log(`${client.user.username} prêt et connecté !`);
    } catch (error) {
        console.error(error);
    }
});




client.login(token);
