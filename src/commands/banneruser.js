const { EmbedBuilder, SlashCommandBuilder, User, GuildMember } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banner')
        .setDescription('Displays a user\'s banner.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user whose banner you want to see')
                .setRequired(false)), 

    execute: async (client, interaction) => {
        const member = interaction.options.getMember('user') || interaction.member;

        try {
            const fullUser = await client.users.fetch(member.id, { force: true });
            const bannerUrl = fullUser.bannerURL({ dynamic: true, size: 1024 });

            if (!bannerUrl) {
                return interaction.reply({ content: "This user does not have a banner.", ephemeral: true });
            }

            const bannerEmbed = new EmbedBuilder()
                .setTitle(`Banner of ${fullUser.tag}`)
                .setImage(bannerUrl)
                .setColor(0x0099FF);

            await interaction.reply({ embeds: [bannerEmbed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'An error occurred while retrieving the banner.', ephemeral: true });
        }
    }
};
