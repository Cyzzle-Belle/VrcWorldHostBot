import * as winston from 'winston'

export default (service: string) => winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service },
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
});
