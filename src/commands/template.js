const { EmbedBuilder, Permissions, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require("quick.db");
const DATABASE = require("../../Init/db.js")

const config = require("../config.js");
const humanizeDuration = require("humanize-duration")

module.exports = {
  execute: new SlashCommandBuilder()
  .setName('template')
  .setDescription('template'),
    run: async (client, interaction) => {

      
        
    }
 };
