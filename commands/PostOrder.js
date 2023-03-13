const { SlashCommandBuilder } = require("discord.js");
const { ByBitInterface } = require("../interface/bybitAPI.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("post_order")
    .setDescription("Create an order With information")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("post_order")
        .setRequired(true)
        .addChoices(
          { name: "spot", value: "spot" },
          { name: "linear", value: "linear" },
          { name: "inverse", value: "inverse" },
          { name: "option", value: "option" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("symbol")
        .setDescription("symbol")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("is_leverage")
        .setDescription("is_leverage")
        .setRequired(true)
        .addChoices({ name: "Yes", value: 1 }, { name: "No", value: 0 })
    )
    .addStringOption((option) =>
      option
        .setName("side")
        .setDescription("side")
        .setRequired(true)
        .addChoices({ name: "Buy", value: "Buy" }, { name: "Sell", value: "Sell" })
    )
    .addStringOption((option) =>
      option
        .setName("order_type")
        .setDescription("order_type")
        .setRequired(true)
        .addChoices({ name: "Market", value: "Market" }, { name: "Limit", value: "Limit" })
    )
    .addStringOption((option) =>
      option
        .setName("qty")
        .setDescription("qty")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("price")
        .setDescription("price")
    )
    .addIntegerOption((option) =>
      option
        .setName("trigger_direction")
        .setDescription("trigger_direction")
        .addChoices({ name: "1", value: 1 }, { name: "2", value: 2 })
    )
    .addStringOption((option) =>
      option
        .setName("order_filter")
        .setDescription("order_filter")
        .addChoices({ name: "Order", value: "Order" }, { name: "tpslOrder", value: "tpslOrder" })
    )
    .addIntegerOption((option) =>
      option
        .setName("trigger_price")
        .setDescription("trigger_price")
    )
    .addStringOption((option) =>
      option
        .setName("trigger_by")
        .setDescription("trigger_by")
        .addChoices(
          { name: "LastPrice", value: "LastPrice" },
          { name: "IndexPrice", value: "IndexPrice" },
          { name: "MarkPrice", value: "MarkPrice" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("order_iv")
        .setDescription("order_iv"))
    .addStringOption((option) =>
      option
        .setName("time_in_force")
        .setDescription("time_in_force")
        .addChoices(
          { name: "GTC", value: "GTC" },
          { name: "IOC", value: "IOC" },
          { name: "FOK", value: "FOK" },
          { name: "PostOnly", value: "PostOnly" }
        )
    )
    .addIntegerOption((option) =>
      option
        .setName("position_idx")
        .setDescription("position_idx")
        .addChoices({ name: "1", value: 1 }, { name: "2", value: 2 }, { name: "3", value: 3 })
    )
    .addStringOption((option) =>
      option
        .setName("order_link_id")
        .setDescription("order_link_id")
    )
    .addStringOption((option) =>
      option
        .setName("take_profit")
        .setDescription("take_profit")
    )
    .addStringOption((option) =>
      option
        .setName("stop_loss")
        .setDescription("stop_loss")
    )
    .addStringOption((option) =>
      option
        .setName("tp_trigger_by")
        .setDescription("tp_trigger_by")
        .addChoices(
          { name: "LastPrice", value: "LastPrice" },
          { name: "IndexPrice", value: "IndexPrice" },
          { name: "MarkPrice", value: "MarkPrice" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("sl_trigger_by")
        .setDescription("sl_trigger_by")
        .addChoices(
          { name: "LastPrice", value: "LastPrice" },
          { name: "IndexPrice", value: "IndexPrice" },
          { name: "MarkPrice", value: "MarkPrice" }
        )
    )
    .addBooleanOption((option) =>
      option
        .setName("reduce_only")
        .setDescription("reduce_only")
    )
    .addBooleanOption((option) =>
      option
        .setName("close_on_trigger")
        .setDescription("close_on_trigger")
    )
    .addBooleanOption((option) =>
      option.setName("mmp")
      .setDescription("mmp")),
  async execute(interaction) {
    let data = {
      "category": interaction.options.getString("category"),
      "symbol": interaction.options.getString("symbol"),
      "isLeverage": interaction.options.getInteger("is_leverage"),
      "side": interaction.options.getString("side"),
      "orderType": interaction.options.getString("order_type"),
      "qty": interaction.options.getString("qty"),
      "price": interaction.options.getString("price"),
      "triggerDirection": interaction.options.getInteger("trigger_direction"),
      "orderFilter": interaction.options.getString("order_filter"),
      "triggerPrice": interaction.options.getInteger("trigger_price"),
      "triggerBy": interaction.options.getString("trigger_by"),
      "orderIv": interaction.options.getString("order_iv"),
      "timeInForce": interaction.options.getString("time_in_force"),
      "positionIdx": interaction.options.getInteger("position_idx"),
      "orderLinkId": interaction.options.getString("order_link_id"),
      "takeProfit": interaction.options.getString("take_profit"),
      "stopLoss": interaction.options.getString("stop_loss"),
      "tpTriggerBy": interaction.options.getString("tp_trigger_by"),
      "slTriggerBy": interaction.options.getString("sl_trigger_by"),
      "reduceOnly": interaction.options.getBoolean("reduce_only"),
      "closeOnTrigger": interaction.options.getBoolean("close_on_trigger"),
      "mmp": interaction.options.getString("mmp")
    };
    return interaction.reply("```JSON\n" + JSON.stringify(data) + "```");
  },
};
