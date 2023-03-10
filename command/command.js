const { SlashCommandBuilder } = require('discord.js');


const pongCommand = new SlashCommandBuilder()
    .setName('pong')
    .setDescription('Renvoie "ping"')
    .addStringOption(option =>
        option.setName('text')
            .setDescription('Texte pour tester')
            .setRequired(true)
    );

module.exports = { pongCommand };