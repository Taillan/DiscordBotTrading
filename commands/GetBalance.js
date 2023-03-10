const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Replies with youre token blance!"),
  async execute(interaction) {
    //const Balance = await getAllCountBallanceContract();
    //await interaction.reply("```JSON\n" + "Balance" + "```");
    await interaction.reply("Pong!");
  },
};
