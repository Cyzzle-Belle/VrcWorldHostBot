import { Document, Model, model, Schema } from 'mongoose'

export interface ILog extends Document {
  label: string
  content: string
  created: Date
}

export let LogSchema: Schema = new Schema({
  label: {
  	type: Schema.Types.String,
    required: true,
  },
  content: {
    type: Schema.Types.String,
    required: true,
  },
  created: {
    type: Schema.Types.String,
    default: Date.now(),
  },
})

export const Log: Model<ILog> = model<ILog>(
  'LogSchema',
  LogSchema,
)
