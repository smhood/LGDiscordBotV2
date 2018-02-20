const Discord = require('discord.js');
const client = new Discord.Client();

//test
client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  if (!message.content.startsWith(process.env.PREFIX)) return;
  const command = msg.content.split(' ')[0].substr(process.env.PREFIX.length);
  if (command === 'ping') return msg.channel.send('pong');
});

client.login(process.env.TOKEN);