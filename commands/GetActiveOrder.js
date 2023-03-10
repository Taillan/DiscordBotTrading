const { SlashCommandBuilder } = require("discord.js");
const { getOrders } = require("../interface/bybitAPI.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("get_active_orders")
    .setDescription("Replies with youre active order!")
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
    let ActiveOrder = await getOrders(
      interaction.options.getString("acount_category")
    );
    console.log(JSON.parse(ActiveOrder));
    await interaction.reply("```JSON\n" + JSON.parse(ActiveOrder) + "```");
  },
};
