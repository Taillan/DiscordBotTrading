require('dotenv').config(); //initialize dotenv
const Discord = require('discord.js');

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds, 
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.DirectMessages,
        Discord.GatewayIntentBits.Guilds,
    ] 
}); //create new client
//make sure this line is the last line
client.login(process.env.TOKEN); //login bot using token

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
  
// This code will run once the bot has disconnected from Discord.
client.on("disconnected", function () {
      // alert the console
    console.log("Disconnected!");
  
      // exit node.js with an error
    process.exit(1);
});

client.on('messageCreate', msg => {
// You can view the msg object here with console.log(msg)
    entry_price = 0;
    leverage = 1;
    type = "";
    stop_loss = 0;
    tp_list = [];
    token="";

    Parsed = msg.content.split('\n')
    if (Parsed[0] === '-------------------------') {
            for(const el in Parsed){
              if(Parsed[el].includes("Token")){
                let temp =Parsed[el].split(' ');
                token = temp[temp.length -1];
              }
              if(Parsed[el].includes("Type")){
                let temp =Parsed[el].split(' ');
                type = temp[temp.length -1];
              }
              if(Parsed[el].includes("Entry price")){
                let temp =Parsed[el].split(' ');
                entry_price = temp[temp.length -1].replace('$','');
              }
              if(Parsed[el].includes("TP")){
                let temp =Parsed[el].split(' ');
                tp_list.push(temp[temp.length -1].replace('$',''));
              }
              if(Parsed[el].includes("Stop Loss")){
                let temp =Parsed[el].split(' ');
                stop_loss = temp[temp.length -1].replace('$','');
              }
            }

            if(entry_price<0.009){
              leverage=10;
            }
            else if(entry_price<0.09){
              leverage=15;
            }
            else if(entry_price<10){
              leverage=17.5;
            }
            else if(entry_price<50){
              leverage=20;
            }
            else if(entry_price<100){
              leverage=20;
            }
            else if(entry_price<500){
              leverage=25;
            }
            else if(entry_price>5000){
              leverage=30;
            }
            
            let POSITION =
            {
              "category": "linear",
              "symbol": token.replace("/",""),
              "tradeMode":1, //0: cross margin. 1: isolated margin
              "buyLeverage": leverage,
              "buyLeverage": leverage,
              "tpSlMode": "Partial", //Full,Partial
              "stopLoss": stop_loss.toString(),
              "slSize": stop_loss.toString(),
            }

            
            msg.reply(`entry_price ${entry_price}`);
            msg.reply(`leverage ${leverage}`);
            msg.reply(`type ${type}`);
            msg.reply(`stop_loss ${stop_loss}`);
            msg.reply(`tp_list ${tp_list}`);
            msg.reply(`token ${token}`);
        }

        
});