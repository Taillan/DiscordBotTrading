const { SlashCommandBuilder } = require("discord.js");
const { getAllCountBallanceContract } = require("bybitAPI");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("Balance")
    .setDescription("Replies with youre token blance!"),
  async execute(interaction) {
    const Balance = await getAllCountBallanceContract();
    interaction.reply("```JSON\n" + Balance + "```");
  },
};
