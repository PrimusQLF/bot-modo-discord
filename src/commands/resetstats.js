const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require("discord.js");
const Database = require("../../Helpers/Database");
const mdb = new Database("Database", "Message");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resetstats')
    .setDescription('Resets the server\'s message statistics.')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator | PermissionsBitField.Flags.ManageGuild)
    .addStringOption(option =>
      option.setName('type')
        .setDescription('The type of data to reset')
        .setRequired(true)
        .addChoices(
          { name: 'all', value: 'all' },
          { name: 'messages', value: 'messages' }
        )),
  execute: async (client, interaction) => {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) && !interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
      await interaction.reply({ content: "You do not have permission to do this.", ephemeral: true });
      return;
    }

    const resetType = interaction.options.getString('type');

    switch (resetType) {
      case "all":
        mdb.set(`stats.${interaction.guild.id}`, {});
        break;
      case "messages":
        mdb.set(`stats.${interaction.guild.id}`, {});
        break;
    }

    await interaction.reply({ content: `The \`${resetType}\` information has been successfully reset.`, ephemeral: true });
  }
};
