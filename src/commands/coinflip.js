const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('Flips a coin and returns heads or tails.'),

    execute: async (client, interaction) => {       
        const result = Math.random() < 0.5 ? 'heads' : 'tails';

        const embed = new EmbedBuilder()
            .setTitle('Coin Flip Result')
            .setDescription(`The coin landed on **${result}**!`)
            .setColor(0x0099FF)
            .setThumbnail(result === 'heads' ?
                'https' : // Replace with your image URL for "heads"
                'https'   // Replace with your image URL for "tails"
            );

        await interaction.reply({ embeds: [embed] });
    }
};
