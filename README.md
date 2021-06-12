# VRC World Host Bot

To use this script, a player must be logged into VRChat from a VRChat client. This script can be ran from any machine. It does not need to be on the machine that is running the VRChat client.

# Configuration
Configuration is handled through a Dot ENV file. In the root, edit the `.env` file.
- VRCHAT_USERNAME: VR Chat credentials
- VRCHAT_PASSWORD: VR Chat credentials
- REQUEST_DELAY: Number of miliseconds between notification pulls from the VRC API
- PORT: Port that the Express server is running on

# Commands
`npm run dev` This handles it all right now.
TODO: Add lines for the other commands

## Features
### Friend Requests

At this time, the bot will automatically accept all requests sent to it.
TODO: Interface with some method of administrating who the bot will accept requests from.

### Requet Invites

The bot will accept all requests at this time.
At this time, the bot will automatically accept all requests sent to it.
TODO: 
- Interface with some method of administrating who the bot will accept requests from.
- Possibly add a tagging/role system so that only certain groups can join.

### Bot API

The bot is currently running an Express server. No endpoints are currently setup. It is the intention to be able to administrate the bot via this API.


### Further Spiking
#### World Auto Creation
Would be nice to automate the world that he Bot's client joins. This can be done via a VRChat launch URL. Need to look into the instance ID (before the tilda). From initial attempts, it looks like VRChat will accept a random number there.  
https://vrchat.com/home/launch?worldId=wrld_0b4e5774-473d-4943-bb22-aac0c1b706f3&instanceId=26824\~private(usr_a4cd0d89-f1e1-4fbf-80df-21f28b788887)~nonce(3e5e8625-0a65-4643-8ecb-015fe6451d19)
Also need to consider what happens if the Bot's client drops from the world. How would rejoining work?