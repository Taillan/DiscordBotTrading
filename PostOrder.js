const { SlashCommandBuilder } = require("discord.js");
const { ByBitInterface } = require("../interface/bybitAPI.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("PostOrder")
    .setDescription("Create an order With information")
    .addStringOption((option) => option.setName("category").setRequired(true))
    .addStringOption((option) => option.setName("symbol").setRequired(true))
    .addIntegerOption((option) =>
      option.setName("isLeverage").setRequired(true)
    )
    .addStringOption((option) => option.setName("side").setRequired(true))
    .addStringOption((option) => option.setName("orderType").setRequired(true))
    .addStringOption((option) => option.setName("qty").setRequired(true))
    .addStringOption((option) => option.setName("price"))
    .addStringOption((option) => option.setName("triggerDirection"))
    .addStringOption((option) => option.setName("orderFilter"))
    .addIntegerOption((option) => option.setName("triggerPrice"))
    .addStringOption((option) => option.setName("triggerBy"))
    .addStringOption((option) => option.setName("orderIv"))
    .addStringOption((option) => option.setName("timeInForce"))
    .addIntegerOption((option) => option.setName("positionIdx"))
    .addStringOption((option) => option.setName("orderLinkId"))
    .addStringOption((option) => option.setName("takeProfit"))
    .addStringOption((option) => option.setName("stopLoss"))
    .addStringOption((option) => option.setName("tpTriggerBy"))
    .addStringOption((option) => option.setName("slTriggerBy"))
    .addBooleanOption((option) => option.setName("reduceOnly"))
    .addBooleanOption((option) => option.setName("closeOnTrigger"))
    .addBooleanOption((option) => option.setName("mmp")),
  async execute(interaction) {
    let data = await ByBitInterface(interaction.options.getString("Option1X"));
    console.log(JSON.parse(data));
    await interaction.reply("```JSON\n" + data + "```");
  },
};
/*category: CategoryV5;
    symbol: string;
    isLeverage?: 0 | 1;
    side: OrderSideV5;
    orderType: OrderTypeV5;
    qty: string;
    price?: string;
    triggerDirection?: 1 | 2;
    orderFilter?: 'Order' | 'tpslOrder';
    triggerPrice?: string;
    triggerBy?: OrderTriggerByV5;
    orderIv?: string;
    timeInForce?: OrderTimeInForceV5;
    positionIdx?: PositionIdx;
    orderLinkId?: string;
    takeProfit?: string;
    stopLoss?: string;
    tpTriggerBy?: OrderTriggerByV5;
    slTriggerBy?: OrderTriggerByV5;
    reduceOnly?: boolean;
    closeOnTrigger?: boolean;
    mmp?: boolean;*/
