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
    console.log(msg.content)
    if (msg.content === 'Hello') {
            msg.reply(`Hello ${msg.author.username}`);
        }
});