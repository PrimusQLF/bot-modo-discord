const { EmbedBuilder, SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const moment = require("moment");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Displays information about a user.')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('The user to display')
                .setRequired(false)), 

    execute: async (client, interaction) => {
        const user = interaction.options.getUser('user') || interaction.user;
        const member = interaction.options.getMember('user') || interaction.member;

        const embed = new EmbedBuilder()
            .setTitle(`User Information for ${user.tag}`)
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: 'Username', value: user.username, inline: true },
                { name: 'Discriminator', value: `#${user.discriminator}`, inline: true },
                { name: 'ID', value: user.id },
                { name: 'Account Created', value: `${moment(user.createdAt).format('DD/MM/YYYY')} (${moment(user.createdAt).fromNow()})`, inline: true },
            )
            .setColor(0x00FF00) 

        if (member) {
            embed.addFields(
                { name: 'Joined Server', value: `${moment(member.joinedAt).format('DD/MM/YYYY')} (${moment(member.joinedAt).fromNow()})`, inline: true },
                { name: 'Roles', value: member.roles.cache.map(role => role.name).join(', ') }
            );
        }

        await interaction.reply({ embeds: [embed] });
    }
};
