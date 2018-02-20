const Discord = require('discord.js');
const client = new Discord.Client();

//test
client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  if (message.content === 'ping') {
    message.reply('pong' + process.env.PREFIX);
  }
});

client.login(process.env.TOKEN);