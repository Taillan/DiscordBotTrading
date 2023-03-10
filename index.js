require("dotenv").config(); //initialize dotenv
const { getAllCountBallanceContract } = require("./bybitAPI.js");
const { pongCommand } = require("./commands/command");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const path = require("node:path");
const fs = require("node:fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
  ],
});

const commands = [];
console.log("Collection commands créé");

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));
console.log("Collection files readed");

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ("data" in command && "execute" in command) {
    commands.push(command.data.toJSON());
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}
console.log("Command added to collection");

console.log("Connexion du Bot");
client.login(process.env.TOKEN); //login bot using token

// This code will run once the bot has disconnected from Discord.
client.on("disconnected", function () {
  // alert the console
  console.log("Disconnected!");

  // exit node.js with an error
  process.exit(1);
});

// INSCRIPTION DES COMMANDES SUR DISCORD
(async () => {
  console.log("INSCRIPTION DES COMMANDES SUR DISCORD");
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );
    await rest.put(Routes.applicationCommands(process.env.APP_ID), {
      body: commands,
    });
    console.log(
      `Successfully reloaded ${commands.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
  console.log("FIN INSCRIPTION DES COMMANDES SUR DISCORD");
})();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// INTERACTIONS AUX COMMANDES
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

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
