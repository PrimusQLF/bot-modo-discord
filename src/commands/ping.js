const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Displays the bot\'s latency and Discord API latency.'),

    execute: async (client, interaction) => {
        const sent = await interaction.reply({ content: 'Calculating latency...', fetchReply: true });
        const timeDiff = sent.createdTimestamp - interaction.createdTimestamp;

        const apiLatency = Math.round(client.ws.ping);

        const embed = new EmbedBuilder()
            .setTitle('🏓 Pong!')
            .addFields(
                { name: 'Bot Latency', value: `${timeDiff}ms`, inline: true },
                { name: 'API Latency', value: `${apiLatency}ms`, inline: true },
            )
            .setColor(0x0099FF); 

        interaction.editReply({ content: ' ', embeds: [embed] });
    }
};
