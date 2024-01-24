const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");
const config = require('../config.js'); // Make sure the path is correct.

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlock')
        .setDescription('Unlocks the current channel.'),
    
    execute: async (client, interaction) => {
        if (!config.owners.includes(interaction.user.id)) {
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor(0xFF0000) 
                    .setDescription('You do not have permission to use this command.')
                ],
                ephemeral: true
            });
        }

        const channel = interaction.channel;

        if (channel.type !== ChannelType.GuildText) {
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor(0xFFA500) 
                    .setDescription('This command can only be used in text channels.')
                ],
                ephemeral: true
            });
        }

        try {
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: null });

            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor(0x00FF00) 
                    .setDescription(`The channel ${channel.name} has been successfully unlocked.`)
                ]
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setDescription('An error occurred while attempting to unlock the channel.')
                ],
                ephemeral: true
            });
        }
    }
};
