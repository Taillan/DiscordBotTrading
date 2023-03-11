const { SlashCommandBuilder } = require("discord.js");
const { getCountBallanceContract } = require("../interface/bybitAPI.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("all_balance")
    .setDescription("Replies with youre balance!")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("The Account type")
        .addChoices(
          {
            name: "CONTRACT",
            value: "CONTRACT",
          },
          { name: "SPOT", value: "SPOT" },
          { name: "INVESTMENT", value: "INVESTMENT" },
          { name: "OPTION", value: "OPTION" },
          { name: "UNIFIED", value: "UNIFIED" },
          { name: "FUND", value: "FUND" }
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    let Balance = await getCountBallanceContract(
      interaction.options.getString("type")
    );
    console.log(Balance);
    await interaction.reply(
      "```JSON\n" + JSON.parse(Balance).balance.walletBalance + "```"
    );
  },
};
