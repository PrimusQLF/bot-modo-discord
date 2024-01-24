const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");
const config = require('../config.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Deletes a specified number of messages.')
    .addIntegerOption(option =>
      option.setName('number')
        .setDescription('Number of messages to delete')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100)),

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

    const amount = interaction.options.getInteger('number');

    try {
      await interaction.channel.bulkDelete(amount, true);
      await interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor(0x00FF00)
          .setDescription(`${amount} messages have been successfully deleted.`)
        ],
        ephemeral: true
      });
    } catch (error) {
      console.error(error);
      interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor(0xFF0000)
          .setDescription('An error occurred while trying to delete the messages.')
        ],
        ephemeral: true
      });
    }
  }
};
