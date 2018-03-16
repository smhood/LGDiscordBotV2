const { Command } = require('discord.js-commando');

module.exports = class GetMatsRequest extends Command {
  constructor(client) {
      super(client, {
          name: 'mats',
          group: 'ascendance',
          memberName: 'mats',
          description: 'Gets link to make material requests.',
          examples: ['mats']
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
        title: 'Raw Mats Request',
        description: 'Need some mats? Post here!',
        url: 'http://www.legend-gaming.net/lgforums/showthread.php?15431-Raw-Material-Request'
      }})
  }
};