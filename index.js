const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const { connect, getDatabase } = require('./database/mongoDb');

const client = new CommandoClient({
  commandPrefix: process.env.PREFIX,
  owner: '206136363836243968',
  disableEveryone: true,
  unknownCommandResponse: false
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['activity', 'Commands dedicated to viewing activity.'],
        ['general', 'Commands dedicated for general use.']
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
    if(message.content.length < 10) return;

    const db = getDatabase();

    db.collection('members').findAndModify(
      { userName: message.author.username.toLowerCase() },
      [],
      { $inc: { postCount: 1 }, $set: { groups: message.member.roles.map(role => role.name.toLowerCase())} },
      {new: true, upsert: true}, 
      function(err, doc){
        if(err){
          console.log(err);
        }
      }
    );
  });

  client.login(process.env.TOKEN);