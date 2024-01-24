const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const Database = require("../../Helpers/Database");
const mdb = new Database("Database", "Message");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('top')
    .setDescription('Displays the top 5 users with the most messages sent.'),
  execute: async (client, interaction) => {
    const messageData = mdb.get(`stats.${interaction.guild.id}`) || {};

    let sortedUsers = Object.entries(messageData)
      .map(([userId, userStats]) => ({ userId, totalMessages: userStats.messages || 0 }))
      .sort((a, b) => b.totalMessages - a.totalMessages)
      .slice(0, 5);

    let messageList = sortedUsers.map((user, index) => {
      return `\`${index + 1}.\` <@${user.userId}>: \`${user.totalMessages} messages\``;
    }).join("\n") || "No message activity recorded.";

    let embed = new EmbedBuilder()
      .setColor(interaction.member.displayHexColor || "#FFFFFF")
      .setFooter({ text: `${interaction.user.tag} | Powered by PeterQLF` })
      .setThumbnail(interaction.user.avatarURL({dynamic: true}))
      .addFields(
        { name: "Message Leaderboard", value: messageList }
      );

    await interaction.reply({ embeds: [embed] });
  }
};
