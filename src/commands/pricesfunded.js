const { EmbedBuilder, Permissions, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require("quick.db");
const DATABASE = require("../../Init/db.js")
const config = require("../config.js");
const humanizeDuration = require("humanize-duration");
const axios = require("axios"); 

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pricesfunded')
    .setDescription('Displays the current price of the Funded cryptocurrency.'),
    execute: async (client, interaction) => {
      const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=funded&vs_currencies=usd';

      try {
        const response = await axios.get(apiUrl);
        const price = response.data.funded.usd; 

        const priceEmbed = new EmbedBuilder()
          .setColor('#0099ff')
          .setTitle('Funded Price')
          .setDescription(`The current price of Funded is $${price} USD`)
          .setTimestamp();

        await interaction.reply({ embeds: [priceEmbed] });
      } catch (error) {
        console.error("Error while retrieving the price of Funded: ", error);
        await interaction.reply("Sorry, I am unable to retrieve the price of Funded at the moment.");
      }
    }
};
