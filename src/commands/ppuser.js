const { EmbedBuilder, SlashCommandBuilder, User } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ppuser')
        .setDescription('Displays a user\'s avatar.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user whose avatar you want to see')
                .setRequired(false)), 

    execute: async (client, interaction) => {        
        const user = interaction.options.getUser('user') || interaction.user;

        const avatarEmbed = new EmbedBuilder()
            .setTitle(`Avatar of ${user.tag}`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 })) 
            .setColor(0x0099FF) 

        await interaction.reply({ embeds: [avatarEmbed] });
    }
};
