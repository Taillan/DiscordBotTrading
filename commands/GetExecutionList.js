const { SlashCommandBuilder } = require("discord.js");
const { getExecution } = require("../interface/bybitAPI.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("get_execution_list")
    .setDescription("Replies with youre active position!")
    .addStringOption((option) =>
      option
        .setName("acount_category")
        .setDescription("The Account type")
        .addChoices(
          {
            name: "spot",
            value: "spot",
          },
          { name: "linear", value: "linear" },
          { name: "inverse", value: "inverse" },
          { name: "option", value: "option" }
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    let PositionInfo = await getExecution(
      interaction.options.getString("acount_category")
    );
    console.log(JSON.parse(PositionInfo));
    await interaction.reply("```JSON\n" + PositionInfo + "```");
  },
};
