const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const Database = require("../../Helpers/Database");
const mdb = new Database("Database", "Message");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('statsuser')
    .setDescription('Displays information and messaging activity of a specified user')
    .addUserOption(option => 
      option.setName('user')
        .setDescription('The user whose statistics you want to see')
        .setRequired(true)),
  execute: async (client, interaction) => {
    const user = interaction.options.getUser('user');
    const guildMember = await interaction.guild.members.fetch(user.id);

    const messageData = mdb.get(`stats.${interaction.guild.id}.${user.id}`) || { messages: 0, activity: null };

    let lastMessageDate = messageData.activity ? new Date(messageData.activity).toLocaleDateString() : "Not recorded";
    let totalMessages = messageData.messages;

    let embed = new EmbedBuilder()
      .setColor(guildMember.displayHexColor || "#FFFFFF")
      .setFooter({ text: `${user.tag} | Powered by PiteurQLF` })
      .setThumbnail(user.avatarURL({dynamic: true}))
      .addFields(
        { name: "User Information", value: `
          \`ID:\` ${user.id}
          \`Roles:\` ${guildMember.roles.cache.size >= 5 ? guildMember.roles.cache.map(role => role.toString()).slice(0, 4).join(", ") + ", ..." : guildMember.roles.cache.map(role => role.toString()).join(", ")}
          \`Nickname:\` ${guildMember.displayName}
        `},
        { name: "Message Activity", value: `Last Message: ${lastMessageDate}\nTotal Messages: ${totalMessages}`}
      );

    await interaction.reply({ embeds: [embed] });
  }
};
