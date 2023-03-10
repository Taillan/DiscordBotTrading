
// INTERACTIONS AUX COMMANDES
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
  
    //const command = interaction.client.commands.get(interaction.commandName);
    const command = commands.find((o) => o.name === interaction.commandName);
  
    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }
  
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`Error executing ${interaction.commandName}`);
      console.error(error);
    }
  });
  
  //Parse Trade
  client.on("messageCreate", (msg) => {
    entry_price = 0;
    leverage = 1;
    trade_type = "";
    stop_loss = 0;
    tp_list = [];
    token = "";
  
    Parsed = msg.content.split("\n");
    if (Parsed[0] === "-------------------------") {
      for (const el in Parsed) {
        if (Parsed[el].includes("Token")) {
          let temp = Parsed[el].split(" ");
          token = temp[temp.length - 1];
        }
        if (Parsed[el].includes("Type")) {
          let temp = Parsed[el].split(" ");
          trade_type = temp[temp.length - 1];
          if (trade_type == "Long") {
            trade_type = "Buy";
          } else {
            trade_type = "Sell";
          }
        }
        if (Parsed[el].includes("Entry price")) {
          let temp = Parsed[el].split(" ");
          entry_price = temp[temp.length - 1].replace("$", "");
        }
        if (Parsed[el].includes("TP")) {
          let temp = Parsed[el].split(" ");
          tp_list.push(temp[temp.length - 1].replace("$", ""));
        }
        if (Parsed[el].includes("Stop Loss")) {
          let temp = Parsed[el].split(" ");
          stop_loss = temp[temp.length - 1].replace("$", "");
        }
      }
  
      if (entry_price < 0.009) {
        leverage = 10;
      } else if (entry_price < 0.09) {
        leverage = 15;
      } else if (entry_price < 10) {
        leverage = 17.5;
      } else if (entry_price < 50) {
        leverage = 20;
      } else if (entry_price < 100) {
        leverage = 20;
      } else if (entry_price < 500) {
        leverage = 25;
      } else if (entry_price > 5000) {
        leverage = 30;
      }
  
      let POSITION = {
        category: "linear",
        symbol: token.replace("/", ""),
        isLeverage: 1,
        side: trade_type,
        orderType: "Market", //TODO Ecris en dure a modifi??
        qty: "a calculer avec le entryprice et les 5% du wallet (selon strat)",
        price: entry_price,
        takeProfit:
          "A g??rer car on peux en mettre quun mais ne pas mettre la position a 100%",
        stopLoss: stop_loss.toString(),
        slTriggerBy: "A voir avec un trader la strat??gie",
        // La suite a v??rifier cest pas partout dans la doc a essayer sur le testnet quoi
        tradeMode: 1, //0: cross margin. 1: isolated margin
        buyLeverage: leverage,
        buyLeverage: leverage,
        tpSlMode: "Full", //Full,Partial
        slSize: stop_loss.toString(),
      };
      msg.reply("```JSON\n" + JSON.stringify(POSITION) + "```");
    }
  });
  