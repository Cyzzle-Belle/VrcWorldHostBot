import { Constants, SlashCommandClient } from 'detritus-client';
import Logger from 'logger';
import { connect } from 'mongoose';

import * as config from '../var/config'
import { Player } from '../database/models/player.model'

const { InteractionCallbackTypes, MessageFlags } = Constants;

const db = config.DB && connect(config.DB)
const logger = Logger('DiscordBot')
const slashClient = new SlashCommandClient(config.DISCORD_BOT_TOKEN);


// Simple ping/pong command
slashClient.add({
  description: 'Ping!',
  name: 'ping',
  run: (context, _args) => {
    // Commands should return a promise to ensure that errors are handled
    return context.respond(InteractionCallbackTypes.CHANNEL_MESSAGE_WITH_SOURCE, 'pong!');
  },
});

slashClient.add({
    name: 'register',
    description: '`/register <VRChat Client Name>` connects your VRChat name to your Discord name.',
    run: (context, args) => {
        return Player.findOne({
            discordId: context.userId
        }).then( player => {
            if (player) {
              if(player.status == 'banned') {
                  return context.respond(InteractionCallbackTypes.CHANNEL_MESSAGE_WITH_SOURCE, {
                    content: `${context.user.name} is banned from this server. Please follow this server's guidelines in terms of being banned.`,
                    flags: MessageFlags.EPHEMERAL,
                });
              } else {
                return context.respond(InteractionCallbackTypes.CHANNEL_MESSAGE_WITH_SOURCE, {
                    content: `${context.user.name} is already associated to a VRChat player. \`/unregister\` first before associating with a new VRChat name.`,
                    flags: MessageFlags.EPHEMERAL,
                });
              }
            } else {
                const newPlayer = new Player({
                  discordId: context.userId, 
                  discordName: context.user.name,
                })
                newPlayer.save().then(()=>{
                    return context.respond(InteractionCallbackTypes.CHANNEL_MESSAGE_WITH_SOURCE, {
                        content: `Registration pending. Friend request will be sent to ${args[0]}.`,
                        flags: MessageFlags.EPHEMERAL,
                    });
                })
            }
        }).catch((err)=>{
            logger.error('Error registering player', context.user, err)
            return context.respond(InteractionCallbackTypes.CHANNEL_MESSAGE_WITH_SOURCE, {
                content: `An error has occurred. The error has been logged and should be addressed soon.`,
                flags: MessageFlags.EPHEMERAL,
            });
        });
    },
})

// Command demonstrating command pipelines
slashClient.add({
  description: 'Are you the owner or part of the team for this application?',
  name: 'owner',
  // onBefore should return a boolean to indicate whether or not the command should proceed
  onBefore: (context) => context.client.isOwner(context.userId),
  // we want the error to only show to the user to not clunk up the chat
  onCancel: (context) => {
    return context.respond(InteractionCallbackTypes.CHANNEL_MESSAGE_WITH_SOURCE, {
      content: 'This command is only available to the bot owner.',
      flags: MessageFlags.EPHEMERAL,
    });
  },
  run: async (context) => {
    // Commands may also run asynchronously.
    await context.respond(InteractionCallbackTypes.CHANNEL_MESSAGE_WITH_SOURCE, 'You are the owner of the bot!');
  },
});

// Spawn the client in an async context
//
// Note: Due to how Node handles tasks, the script will block until the Detritus client
// is killed.
logger.info('Starting Discord Bot');

export default () => (async () => {
  // Slash Client will compare the local commands w/ commands stored on discord
  // If any of them differ, it will call `.bulkOverwriteApplicationCommands()` with the local commands
  // Guild-specific Slash commands are not supported right now
  const client = await slashClient.run();
  logger.info(`Client has loaded with a shard count of ${client.shardCount}`);
})();