const { Command } = require('discord.js-commando');
const { getDatabase } = require('../../database/mongoDb');

module.exports = class ReplyCommand extends Command {
  constructor(client) {
      super(client, {
          name: 'reply',
          group: 'activity',
          memberName: 'reply',
          description: 'Replies with a Message.',
          examples: ['reply']
      });
  }

  run(msg) {
    const db = getDatabase();
    db.collection("members").find({}).project({_id: 0}).toArray(function(err, docs){
      if(err){
        console.log(err);
        return;
      }
      return msg.say('Hi, I\'m awake!');
    });
  }
};