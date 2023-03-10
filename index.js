require("dotenv").config(); //initialize dotenv
const { getAllCountBallanceContract } = require("./bybitAPI.js");
const { pongCommand } = require("./command/command")
const Discord = require("discord.js");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const rest = new REST({ version: '9' }).setToken('tokendiscord'); 
const { SlashCommandBuilder } = require('discord.js');

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.DirectMessages,
    Discord.GatewayIntentBits.Guilds,
  ],
});


  // LISTE DES COMMANDES
const pingCommand = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Renvoie "pong"');

    const commands = [pingCommand];


client.login(process.env.TOKEN); //login bot using token

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // INSCRIPTION DES COMMANDES SUR DISCORD
  (async () => {
    try {
      await rest.put(
        Routes.applicationCommands(process.env.APP_ID),
        { body: commands.map(command => command.toJSON()) },
      );
    } catch (error) {
      console.error(error);
    }
  })(); 
});

// INTERACTIONS AUX COMMANDES
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    const response = await ping();
    await interaction.reply(response);
  }

})

//Get balance msg
client.on("messageCreate", async (msg) => {
  if (msg.content.includes("GetBalance")) {
    const Balance = await getAllCountBallanceContract();
    msg.reply("```JSON\n" + Balance + "```");
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
      orderType: "Market", //TODO Ecris en dure a modifié
      qty: "a calculer avec le entryprice et les 5% du wallet (selon strat)",
      price: entry_price,
      takeProfit:
        "A gérer car on peux en mettre quun mais ne pas mettre la position a 100%",
      stopLoss: stop_loss.toString(),
      slTriggerBy: "A voir avec un trader la stratégie",
      // La suite a vérifier cest pas partout dans la doc a essayer sur le testnet quoi
      tradeMode: 1, //0: cross margin. 1: isolated margin
      buyLeverage: leverage,
      buyLeverage: leverage,
      tpSlMode: "Full", //Full,Partial
      slSize: stop_loss.toString(),
    };
    msg.reply("```JSON\n" + JSON.stringify(POSITION) + "```");
  }
});
