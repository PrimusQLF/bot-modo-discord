const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const moment = require("moment"); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Displays information about the server.'),

    execute: async (client, interaction) => {
        const server = interaction.guild;

        const embed = new EmbedBuilder()
            .setTitle(`Server Information: ${server.name}`)
            .setThumbnail(server.iconURL())
            .addFields(
                { name: 'Owner', value: `<@${server.ownerId}>`, inline: true },
                { name: 'Server ID', value: server.id, inline: true },
                { name: 'Members', value: `${server.memberCount}`, inline: true },
                { name: 'Creation Date', value: `${moment(server.createdAt).format('DD/MM/YYYY')} (${moment(server.createdAt).fromNow()})`, inline: true },
                { name: 'Number of Roles', value: `${server.roles.cache.size}`, inline: true },
                { name: 'Number of Channels', value: `${server.channels.cache.size}`, inline: true },
                { name: 'Verification Level', value: `${server.verificationLevel}`, inline: true },
                { name: 'Region', value: `${server.preferredLocale}`, inline: true }
            )
            .setColor(0x00FF00);

        await interaction.reply({ embeds: [embed] });
    }
};
