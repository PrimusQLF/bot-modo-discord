const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {
        const welcomeChannelId = '1123229434451853345'; // Replace with the actual ID of the welcome channel

        try {
            const welcomeChannel = await client.channels.fetch(welcomeChannelId);

            if (!welcomeChannel || !welcomeChannel.permissionsFor(client.user).has(PermissionsBitField.Flags.SendMessages)) {
                throw new Error(`The bot does not have permission to send messages in the channel: ${welcomeChannelId}`);
            }

            const welcomeEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Welcome!')
                .setDescription(`Welcome to the server, ${member.displayName}!`)
                .setImage('https') // Put your image URL here
                .setTimestamp();

            await welcomeChannel.send({ embeds: [welcomeEmbed] });
        } catch (error) {
            console.error('Error when sending the welcome message:', error);
        }
    },
};
