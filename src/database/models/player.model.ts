import { Document, Model, model, Schema } from 'mongoose'

export interface IPlayer extends Document {
  discordName: string
  discordID: number
  discordRoles: [string]
  vrcName: string
  agreesToToc: boolean
  status: string
  created: Date
}

export let PlayerSchema: Schema = new Schema({
  discordName: {
    type: Schema.Types.String,
    required: true,
  },
  discordId: {
    type: Schema.Types.Number,
    required: true,
  },
  discordRoles: {
    type: [Schema.Types.String],
    required: false,
  },
  vrcName: {
    type: Schema.Types.String,
    required: false,
  },
  vrcNamePending: {
    type: Schema.Types.String,
    required: true,
    default: true,
  },
  agreesToToc: {
  	type: Schema.Types.Boolean,
  	default: false,
  },
  roles: {
  	type: [Schema.Types.String],
  },
  status: {
  	type: Schema.Types.String,
  },
  created: {
    type: Schema.Types.String,
    default: Date.now(),
  },
})

export const Player: Model<IPlayer> = model<IPlayer>(
  'Player',
  PlayerSchema,
)
