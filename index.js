const Discord = require('discord.js');
const client = new Discord.Client();

//test
client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  return message.channel.send("Hi!");
});

client.login(process.env.TOKEN);