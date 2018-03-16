const { Command } = require('discord.js-commando');

module.exports = class GetGearRequest extends Command {
  constructor(client) {
      super(client, {
          name: 'gear',
          group: 'ascendance',
          memberName: 'gear',
          description: 'Page to make crafting requests.',
          examples: ['gear']
      });
  }

  hasPermission(msg) {
    if(msg.member.roles.length == 0) return false;
    if(msg.member.roles.exists('name', 'LG Member') || this.client.isOwner(msg.author)){
      return true;
    }
    else{
      return false;
    }
  }

  run(msg) {
      return msg.channel.send(`${msg.author}`,
      { embed: {
        title: 'Crafting Request',
        description: 'Need some gear made? Post here!',
        url: 'http://www.legend-gaming.net/lgforums/showthread.php?15427-Crafting-Requests'
      }})
  }
};