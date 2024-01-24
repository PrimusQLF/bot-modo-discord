const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../config.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Unmutes a user.')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The user to unmute')
        .setRequired(true)),
  
    execute: async (client, interaction) => {
    if (!config.owners.includes(interaction.user.id)) {
      return interaction.reply({ 
        embeds: [
          new EmbedBuilder()
            .setColor(0xFF0000) 
            .setDescription('You do not have permission to use this command.')
        ],
        ephemeral: true 
      });
    }

    const target = interaction.options.getMember('target');

    if (!target.isCommunicationDisabled()) {
      return interaction.reply({ 
        embeds: [
          new EmbedBuilder()
            .setColor(0xFFA500)
            .setDescription('This user is not currently muted.')
        ],
        ephemeral: true 
      });
    }

    try {
      await target.timeout(null); 
      await interaction.reply({ 
        embeds: [
          new EmbedBuilder()
            .setColor(0x00FF00)
            .setDescription(`${target.user.tag} has been successfully unmuted.`)
        ] 
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({ 
        embeds: [
          new EmbedBuilder()
            .setColor(0xFF0000) 
            .setDescription('An error occurred while attempting to unmute the user.')
        ],
        ephemeral: true 
      });
    }
  }
};
