const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../config.js'); 

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Command description')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The user to ban')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for the ban')
        .setRequired(false)) 
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), 

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

    const target = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    interaction.guild.members.ban(target, { reason: reason })
      .then(() => {
        interaction.reply({
          embeds: [new EmbedBuilder()
            .setColor(0x00FF00) 
            .setDescription(`${target.tag} has been successfully banned for the following reason: ${reason}`)
          ]
        });
      })
      .catch(error => {
        console.error(error);
        interaction.reply({
          embeds: [new EmbedBuilder()
            .setColor(0xFF0000) 
            .setDescription('An error occurred while attempting to ban the user.')
          ],
          ephemeral: true 
        });
      });
  }
};
