const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../config.js'); 

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Unbans a user from the server.')
    .addStringOption(option =>
      option.setName('userid')
        .setDescription('The ID of the user to unban')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('The reason for the unban')
        .setRequired(false)), 

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

    const userId = interaction.options.getString('userid');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    interaction.guild.bans.remove(userId, reason)
      .then(() => {
        interaction.reply({
          embeds: [new EmbedBuilder()
            .setColor(0x00FF00)
            .setDescription(`The user with ID ${userId} has been successfully unbanned.`)
          ]
        });
      })
      .catch(error => {
        console.error(error);
        interaction.reply({
          embeds: [new EmbedBuilder()
            .setColor(0xFF0000) 
            .setDescription('An error occurred while attempting to unban the user.')
          ],
          ephemeral: true 
        });
      });
  }
};
