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
