const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
      .setName('help')
      .setDescription('Displays a list of available commands'),
    execute: async (client, interaction) => {
    const helpEmbed = new EmbedBuilder()
      .setTitle('List of Available Commands')
      .setDescription('Here is a list of commands you can use. Use `/` followed by the command name for more information.')
      .addFields(
        { name: '🚫 /banner', value: 'Displays information on banned users.' },
        { name: '🎲 /choose', value: 'Choose between multiple options.' },
        { name: '🪙 /coinflip', value: 'Flip a coin to get heads or tails.' },
        { name: '🏓 /ping', value: 'Displays the bot\'s current latency.' },
        { name: '🖼️ /ppuser', value: 'Displays a user\'s avatar.' },
        { name: 'ℹ️ /serverinfo', value: 'Displays information about the server.' },
        { name: '👤 /userinfo', value: 'Displays information about a specified user.' },
        { name: '📊 /me', value: 'Displays your message activity statistics.' },
        { name: '📈 /top', value: 'Displays the top 5 users in terms of message activity.' },
        { name: '🔍 /statsuser', value: 'Displays message activity statistics of a specified user.' },
      )
      .setColor(0x00FF00)
      .setFooter({ text: 'Type /command to use a specific command.', iconURL: interaction.user.displayAvatarURL() });

    await interaction.reply({ embeds: [helpEmbed] });
  }
};
