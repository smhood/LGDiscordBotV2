const { Command } = require('discord.js-commando');

module.exports = class InviteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            aliases: ['inv'],
            group: 'general',
            memberName: 'invite',
            description: 'Creates temporary guild invite.',
            examples: ['invite']
        });
    }

    hasPermission(msg) {
      if(msg.member.roles.exists('name', 'LG Member') || msg.member.roles.exists('name', 'Officer') || this.client.isOwner(msg.author)){
        return true;
      }
      else{
        return false;
      }
    }

    async run(msg) {
      var options = {
        max_age: 20,
        temporary: true
      }
      msg.channel.createInvite(options)
        .then(function(result){
          return msg.channel.send(result.url);
        })
        .catch(function(e){
          return msg.channel.send('Sorry something exploded.');
        });
    }
};