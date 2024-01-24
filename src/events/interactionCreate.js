const { readdirSync } = require("fs");
const Database = require("../../Helpers/Database"); // Assurez-vous que le chemin d'accès est correct
const mdb = new Database("Database", "Message");

module.exports = {
  name: 'interactionCreate',
  execute: async (interaction) => {
    if (!interaction.isCommand()) return;
    if (interaction.user.bot) return;

    const { client } = interaction;

    // Récupère le nom de la commande de l'interaction
    const commandName = interaction.commandName.toLowerCase();

    // Met à jour les statistiques de messages de l'utilisateur
    const userStats = mdb.get(`stats.${interaction.guild.id}.${interaction.user.id}`) || { messages: 0 };
    userStats.messages++;
    mdb.set(`stats.${interaction.guild.id}.${interaction.user.id}`, userStats);

    // Parcourt le dossier des commandes pour trouver le fichier correspondant
    const commandFiles = readdirSync('./src/commands');
    const commandFile = commandFiles.find(file => {
      let command;
      try {
        command = require(`../../src/commands/${file}`);
      } catch (error) {
        console.error(`Erreur lors du chargement de la commande '${file}':`, error);
      }
      return command && command.data && command.data.name.toLowerCase() === commandName;
    });

    if (!commandFile) {
      console.error(`La commande "${commandName}" n'a pas été trouvée.`);
      return;
    }

    // Importe la commande trouvée
    const command = require(`../../src/commands/${commandFile}`);
    if (command) {
      try {
        // Exécute la commande
        await command.execute(client, interaction);
      } catch (error) {
        console.error(`Erreur lors de l'exécution de la commande '${commandName}':`, error);
        await interaction.reply({
          content: 'Une erreur s\'est produite lors de l\'exécution de cette commande.',
          ephemeral: true // Réponse en privé à l'utilisateur
        });
      }
    }
  }
};
