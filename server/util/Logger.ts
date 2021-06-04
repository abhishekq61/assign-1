// import {format, transports} from 'winston';
import * as config from "config"

import * as moment from "moment-timezone";

const prettifyQuery = value => {
  return value
}
export const logger = require('pino')({
  timestamp: () => {
    return `', "time":IN:${moment.tz("Asia/Calcutta").format("YYYY-MM-DD hh:mm A")}` ;
  },
  prettyPrint: {
    // translateTime:true,
    //  customPrettifiers: {
    //    query: prettifyQuery
    //  }
  },

});

// pm2 logs shopify-integrations | grep -i 'zilla' | grep -iv 'lock'
export class AppLogger {
  constructor(private identifier: string) {
  }

  info(client: any, msg: string, err?: Error) {
    logger.info(this.getMessage(client, msg, err), err);
  }

  warn(client: any, msg: string, err?: Error) {
    logger.warn(this.getMessage(client, msg, err), err);
  }

  error(client: any, msg: string, err?: Error) {
    logger.error(this.getMessage(client, msg, err), err);
  }

  getMessage(client: any, msg: string, err?: any) {
    let message = `${this.identifier} |${client && client.shopUrl} | ${msg}`;
    if (err && err.response) {
      message = message + ` Status: ${err.response.status} Data: ${err.response.data && JSON.stringify(err.response.data)}`;
    }
    if (err)
      message = message + ` | ${err.message} | ${err.stack}`;
    return message;
  }
}
