const { Command } = require('discord.js-commando');
const { getDatabase } = require('../../database/mongoDb');

module.exports = class ReplyCommand extends Command {
  constructor(client) {
      super(client, {
          name: 'getgroup',
          aliases: ['group'],
          group: 'activity',
          memberName: 'getgroup',
          description: 'Returns groups users post count.',
          examples: ['getgroup Officer'],
          args: [
            {
                key: 'group',
                prompt: 'What group are you looking for?',
                type: 'string'
            }
        ]
      });
  }

  hasPermission(msg) {
    if(msg.member.roles.exists('name', 'Officer') || this.client.isOwner(msg.author)){
      return true;
    }
    else{
      return false;
    }
  }

  run(msg, { group }) {
    const db = getDatabase();
    dbo.collection("members").find({ groups: group }).toArray(function(err, docs){
      if(err) return msg.channel.sendMessage("An Error Occured");
      console.log(docs);
      if(docs.length > 0){
        var post = "";
        docs.forEach(function(member){
          post += `${member.userName} : PostCount ${member.postCount}\n`;
          if(post.length > 1500){
            msg.author.send(post);
            post = "";
          }
        });

        if(post.length > 0){
          return msg.author.send(post);
        }

        return;
      }
      else{
        return msg.channel.send(group + ' returned back no members. Make sure it is spelled currectly.');
      }
    });
  }
};