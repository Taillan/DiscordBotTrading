const { SlashCommandBuilder } = require("discord.js");
const { getCountBallanceContract } = require("../interface/bybitAPI.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Replies with youre token blance!")
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
    )
    .addStringOption((option) =>
      option.setName("coin").setDescription("The coin").setRequired(true)
    ),
  async execute(interaction) {
    let Balance = await getCountBallanceContract(
      interaction.options.getString("type"),
      interaction.options.getString("coin")
    );
    await interaction.reply(
      "```JSON\n" + JSON.parse(Balance).balance.walletBalance + "```"
    );
  },
};
