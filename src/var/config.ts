let {
  VRCHAT_USERNAME,
  VRCHAT_PASSWORD,
  DISCORD_BOT_SECRET,
  DISCORD_BOT_TOKEN,
  REQUEST_DELAY,
  DB,
  PORT,
  FEATURES,
} = process.env

let FEATURES_LIST = FEATURES.toLowerCase().split(' ')

export {
  VRCHAT_USERNAME,
  VRCHAT_PASSWORD,
  DISCORD_BOT_SECRET,
  DISCORD_BOT_TOKEN,
  REQUEST_DELAY,
  DB,
  PORT,
  FEATURES_LIST,

}

export const ROUTES_DIR = './dist/routes/**/*.js'
export const MODELS_DIR = './dist/models/**/*.js'

export const enum FEATURE {
  API = "api",
  DISCORD = 'discord',
  VRCNOTIFICATIONS = 'vrcnotifications',
}

// GLOBALS
export let log
export let db