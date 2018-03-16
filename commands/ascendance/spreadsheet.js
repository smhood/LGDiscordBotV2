const { Command } = require('discord.js-commando');

module.exports = class GetSpreadsheete extends Command {
  constructor(client) {
      super(client, {
          name: 'spreadsheet',
          aliases: ['sheet'],
          group: 'ascendance',
          memberName: 'spreadsheet',
          description: 'Direct link to the spreadsheet',
          examples: ['spreadsheet']
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
      return msg.channel.send('',
      { embed: {
        title: 'Kendogg Spreadsheets',
        description: 'All your Crowfall Needs!',
        url: 'https://drive.google.com/drive/folders/1ZV6_mZEtG7BRBRyCVEAQ0YanPgAagnlQ'
      }})
  }
};