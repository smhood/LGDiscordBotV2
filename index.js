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
        ['ascendance', 'Commands dedicated for Ascendance.'],
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
    client.guilds.map(guild => {
      console.log(guild.name);
    });
    client.user.setActivity('Monitoring');
  });

  client.on('message', (message) => {
    if (message.author.bot) return;
    if(message.content.length < 10) return;
    updateMember(message);
  });

  setInterval(function(){
    var localTime = new Date(); //get your local time
    var utcTime = localTime.getUTCHours(); // find UTC hours
    var estTime = new Date(); // create a new date object for the EST time
    estTime.setHours(utcTime-5); // adjust it for EST hours.
    
    if(process.env.ENV === "DEV"){
      console.log('Checked Reset at ' + estTime);
      return;
    }
    else{
      console.log('Checked Reset at ' + estTime)
      checkReset(client);
    }
  }, 3600000);

  setInterval(function(){
    var localTime = new Date(); //get your local time
    var utcTime = localTime.getUTCHours(); // find UTC hours
    var estTime = new Date(); // create a new date object for the EST time
    estTime.setHours(utcTime-5); // adjust it for EST hours.
    console.log(estTime);
    if(estTime.getMonth() !== 12){
      localTime.setDate(estTime.getFullYear(), estTime.getMonth() + 1, 1);
      console.log(localTime);
    }
    else{
      localTime.setDate(estTime.getFullYear() + 1, 1, 1);
      console.log(localTime);
    }
  }, 36000);

//Dependent on enviroment
  client.login(process.env.TOKEN);