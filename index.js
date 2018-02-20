const Discord = require('discord.js');
const client = new Discord.Client();

//test
client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  if (!message.content.startsWith(process.env.PREFIX)) return;
  return msg.channel.send('pong');
});

client.login(process.env.TOKEN);