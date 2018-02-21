const { Command } = require('discord.js-commando');
const { getDatabase } = require('../../database/mongoDb');

module.exports = class ReplyCommand extends Command {
  constructor(client) {
      super(client, {
          name: 'getuser',
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

  run(msg, { name }) {
    const db = getDatabase();
    db.collection('members').findOne({ userName: name.toLowerCase() }, { _id: 0}, function(err, result){
      if(err) return msg.channel.sendMessage("An Error Occured");

      if(result){
        return msg.channel.sendMessage(
          `User: ${result.userName}\n` + 
          `Groups: ${result.groups.join(',')}\n` + 
          `PostCount: ${result.postCount}`
        )
      }
      else{
        return msg.channel.sendMessage(
          `User ${name}, either does not exist or has no posts.`
        )
      }
    });
  }
};