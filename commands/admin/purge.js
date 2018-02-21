const { Command } = require('discord.js-commando');

module.exports = class PurgeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'purge',
            group: 'admin',
            memberName: 'purge',
            description: 'Remove all non members..',
            examples: ['purge true/false'],
            args: [
                {
                    key: 'kick',
                    prompt: 'What user?',
                    type: 'boolean',
                    default: false
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

    async run(msg, { kick }) {
      var currentDate = new Date();
      msg.guild.fetchMembers().then(function(temp){
        var badMembers = temp.members.filter(function(member){
          var date = new Date(member.joinedTimestamp);
          date.setDate(date.getDate() + 3);
          if(member.roles.array().length === 1){
            if(date < currentDate){
              if(member.voiceChannel === undefined){
                return true;
              }
            }
          }
        });

        badMembers.forEach(function(member){
          if(kick){
            member.kick();
          }
          msg.channel.send("Removing: " + member.user.username);
        });
      });
    }
};