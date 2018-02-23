const { Command } = require('discord.js-commando');
const { getDatabase } = require('../../database/mongoDb');

module.exports = class GetUserActivity extends Command {
  constructor(client) {
      super(client, {
          name: 'getuser',
          aliases: ['user'],
          group: 'activity',
          memberName: 'getuser',
          description: 'Returns user activity',
          examples: ['getuser Varius'],
          args: [
            {
                key: 'name',
                prompt: 'What user are you looking for?',
                type: 'string'
            }
        ]
      });
  }

  hasPermission(msg) {
    if(msg.member.roles.length == 0) return false;
    if(msg.member.roles.exists('name', 'Officer') || this.client.isOwner(msg.author)){
      return true;
    }
    else{
      return false;
    }
  }

  run(msg, { name }) {
    const db = getDatabase();

    db.collection('members').find({ userName: { "$regex": `.*${name.toLowerCase()}.*`} }, { _id: 0}).sort( { userName: 1 } ).limit( 1, function(err, result){
      if(err) return msg.channel.send("An Error Occured");

      if(result){
        return msg.channel.send(
          `User: ${result.userName}\n` + 
          `Groups: ${result.groups.join(', ')}\n` + 
          `PostCount: ${result.postCount}`
        )
      }
      else{
        return msg.channel.send(
          `User ${name} either does not exist or has no posts.`
        )
      }
    });
  }
};