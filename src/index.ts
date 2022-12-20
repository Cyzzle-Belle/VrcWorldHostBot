require('dotenv').config()
import * as http from 'http'
import Socket from './socket'
import * as config from './var/config'
import ApiServer from './apiServer'
import DiscordBot from './discordBot'
import VRCNotificationHandler from './notificationHandler'

let apiServer = { server:null,socket:null }
let discordBot;
let notificationHandler;

if (config.FEATURES_LIST.includes(config.FEATURE.API)) {
	const server: http.Server = http.createServer(ApiServer)
	const socket = new Socket(server)

	server.listen(config.PORT)

	server.on('error', (e: Error) => {
	  console.log('Error starting server' + e)
	})

	server.on('listening', () => {
	  if (config.DB) {
		console.log(
		  `Server started on port ${config.PORT} on env ${process.env.NODE_ENV ||
			'dev'} dbcon ${config.DB}`,
		)
	  } else {
		console.log(
		  `Server started on port ${config.PORT} on env ${process.env.NODE_ENV ||
			'dev'}`,
		)
	  }
	})

    apiServer.server = server
    apiServer.socket = socket
}
if (config.FEATURES_LIST.includes(config.FEATURE.VRCNOTIFICATIONS)) {
	notificationHandler = VRCNotificationHandler;
}
if (config.FEATURES_LIST.includes(config.FEATURE.DISCORD)) {
	discordBot = DiscordBot();
}

export default {
 	apiServer,
	discordBot,
	notificationHandler,
 }
