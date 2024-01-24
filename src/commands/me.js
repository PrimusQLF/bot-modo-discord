const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const Database = require("../../Helpers/Database");
const mdb = new Database("Database", "Message");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('me')
    .setDescription('Displays user information and messaging activity'),
  execute: async (client, interaction) => {
    const messageData = mdb.get(`stats.${interaction.guild.id}.${interaction.user.id}`) || { messages: 0, activity: null };

    let lastMessageDate = messageData.activity ? new Date(messageData.activity).toLocaleDateString() : "Not recorded";
    let totalMessages = messageData.messages;

    let embed = new EmbedBuilder()
      .setColor(interaction.member.displayHexColor || "#FFFFFF")
      .setFooter({ text: `${interaction.user.tag} | Powered by PiteurQLF` })
      .setThumbnail(interaction.user.avatarURL({dynamic: true}))
      .addFields(
        { name: "User Information", value: `
          \`ID:\` ${interaction.user.id}
          \`Roles:\` ${interaction.member.roles.cache.size >= 5 ? interaction.member.roles.cache.map(role => role.toString()).slice(0, 4).join(", ") + ", ..." : interaction.member.roles.cache.map(role => role.toString()).join(", ")}
          \`Nickname:\` ${interaction.member.displayName}
        `},
        { name: "Message Activity", value: `Last Message: ${lastMessageDate}\nTotal Messages: ${totalMessages}`}
      );

    await interaction.reply({ embeds: [embed] });
  }
};
