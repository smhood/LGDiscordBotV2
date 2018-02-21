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

      db.collection("members").find({ userName: message.author.username }).project({_id: 0}).toArray(function(err, docs){
        if(err){
          console.log(err);
        }
        if(docs.length > 0){
          let member = {
            userName: docs.userName,
            postCount: docs.postCount + 1,
            groups: docs.groups
          }
          dbo.collection("members").insertOne(member, function(err, res){
            if(err){
              console.log(err);
            }
          });
          return;
        }
        else{
          let member = {
            userName: message.author.username,
            postCount: 1,
            groups: message.member.roles.map(role => role.name)
          }
          dbo.collection("members").insertOne(member, function(err, res){
            if(err){
              console.log(err);
            }
          });
          return;
        }
      });
    }
  });

  client.login(process.env.TOKEN);