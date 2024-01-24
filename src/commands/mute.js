const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, time } = require('discord.js');
const config = require('../config.js'); 
const ms = require('ms'); 

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mutes a user for a given duration.')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The user to mute')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('duration')
        .setDescription('Duration of the mute (1m, 1h, 1d, etc. up to 1 month)')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for the mute')
        .setRequired(false)),
  
    execute: async (client, interaction) => {    
    if (!config.owners.includes(interaction.user.id)) {
      return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
    }

    const target = interaction.options.getMember('target');
    const duration = interaction.options.getString('duration');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    const durationMs = ms(duration);
    const maxDurationMs = ms('30d'); 
    if (!durationMs || durationMs < ms('1m') || durationMs > maxDurationMs) {
      return interaction.reply({ content: 'Please provide a valid duration between 1 minute and 1 month.', ephemeral: true });
    }

    const muteEmbed = new EmbedBuilder()
      .setTitle('Mute Executed')
      .addFields(
        { name: 'User', value: `${target.user.tag}` },
        { name: 'Duration', value: `${duration}` },
        { name: 'Reason', value: reason }
      )
      .setColor('DarkRed');

    try {
      await target.timeout(durationMs, reason);
      await interaction.reply({ embeds: [muteEmbed] });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'An error occurred while attempting to mute the user.', ephemeral: true });
    }
  }
};
