const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const config = require('../config.js'); 

module.exports = {
    data: new SlashCommandBuilder()
      .setName('helpadmin')
      .setDescription('Command description'),
    execute: async (client, interaction) => {
        if (!config.owners.includes(interaction.user.id)) {
            return interaction.reply({
                content: 'You do not have permission to use this command.',
                ephemeral: true
            });
        }

        const helpEmbed = new EmbedBuilder()
            .setTitle('🛠️ Administration Commands')
            .setDescription('Here is a list of available commands for administrators. These commands help in managing the server effectively.')
            .addFields(
                { name: '🔇 /mute', value: 'Mute a server member for a specified duration.' },
                { name: '🔊 /unmute', value: 'Unmute a member.' },
                { name: '🚫 /ban', value: 'Ban a member from the server.' },
                { name: '♻️ /unban', value: 'Unban a member from the server.' },
                { name: '🔒 /lock', value: 'Lock a channel to prevent members from posting messages.' },
                { name: '🔓 /unlock', value: 'Unlock a channel.' },
                { name: '📊 /resetstats', value: 'Display your message activity statistics.' },
                { name: '🧹 /clear', value: 'Clear a specified number of messages in a channel.' }
            )
            .setColor(0x0099FF) 
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp()
            .setFooter({ text: 'Moderation Bot', iconURL: client.user.displayAvatarURL() });

        await interaction.reply({ embeds: [helpEmbed], ephemeral: true });
    }
};
