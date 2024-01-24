const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const db = require("quick.db"); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('choose')
        .setDescription('Choose between multiple options.')
        .addStringOption(option =>
            option.setName('options')
                .setDescription('List of options separated by a semicolon ";"')
                .setRequired(true)),

    execute: async (client, interaction) => {
        const optionsString = interaction.options.getString('options');
        const options = optionsString.split(';').map(opt => opt.trim()).filter(opt => opt !== '');

        if (options.length < 2) {
            return interaction.reply({ content: 'Please provide at least two options separated by a semicolon ";"', ephemeral: true });
        }

        const choice = options[Math.floor(Math.random() * options.length)];

        const embed = new EmbedBuilder()
            .setTitle('I choose...')
            .setDescription(choice)
            .setColor(0x0099FF); 

        await interaction.reply({ embeds: [embed] });
    }
};
