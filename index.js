const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const { connect, getDatabase } = require('./database/mongoDb');

const client = new CommandoClient({
  commandPrefix: process.env.PREFIX,
  owner: '206136363836243968',
  disableEveryone: true
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['activity', 'Commands dedicated to viewing activity.']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands(
      {
        ping: false,
        eval: false,
        enable: false,
        disable: false,
        reload: false,
        load: false,
        unload: false,
        groups: false
      })
    .registerCommandsIn(path.join(__dirname, 'commands'));

  client.on('ready', () => {
    connect();
    console.log('Logged in!');
    client.user.setActivity('Monitoring');
  });

  client.on('message', (message) => {
    if (message.author.bot) return;
    else{
      const db = getDatabase();

      db.collection('members').findAndModify({
        query: { userName: message.author.username },
        update: { $inc: { postCount: 1} },
        upsert: true
      });
    }
  });

  client.login(process.env.TOKEN);