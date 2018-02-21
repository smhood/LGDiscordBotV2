const { Command } = require('discord.js-commando');
const { getClient } = require('../../database/mongoDb');

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
    const client = getClient();
    console.log(client);
    return msg.say('Hi, I\'m awake!');
  }
};