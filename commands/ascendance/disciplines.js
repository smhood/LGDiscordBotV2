const { Command } = require('discord.js-commando');
const { getDatabase } = require('../../database/mongoDb');

module.exports = class GetDisciplines extends Command {
  constructor(client) {
      super(client, {
          name: 'disciplines',
          aliases: ['powers'],
          group: 'ascendance',
          memberName: 'disciplines',
          description: 'Gives link to discipline spread sheet',
          examples: ['disciplines']
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
      return msg.channel.send(
      { embed: {
        title: 'Disciplines and Powers Data',
        description: `${msg.author} here is all of our discipline/powers information!`,
        url: 'http://www.legend-gaming.net/lgforums/showthread.php?15429-Spreadsheets'
      }})
  }
};