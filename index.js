const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const { connect } = require('./database/mongoDb');
const { updateMember, checkReset } = require('./events/activityEvents');

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
        ['general', 'Commands dedicated for general use.'],
        ['admin', 'Commands dedicated for admin privileges.']
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
    updateMember(message);
  });

  setInterval(function(){
    checkReset(client);
    console.log('Checked Reset at ' + Date())
  }, 3600000);

//Dependent on enviroment
  client.login(process.env.TOKEN);
