import { configure, getLogger } from "log4js";

const { env } = process;
const {
  LOG_LEVEL = 'info',
} = env;

configure({
  appenders: {
    console: { type: 'console', layout: { type: 'colored' } },
  },
  categories: {
    default: { appenders: ['console'], level: LOG_LEVEL }
  }
});

export const logger = getLogger();