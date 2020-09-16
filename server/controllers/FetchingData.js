import dotenv from 'dotenv';
import fetch from 'node-fetch';

import Redis from 'ioredis';
import JSONCache from 'redis-json';

dotenv.config();

let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

const redis = new Redis(REDIS_URL);

const jsonCache = new JSONCache(redis)

/**
 * @class WhatsappBot
 * @description class will implement bot functionality
 */
class FetchingData {
  /**
   * @memberof FetchingData
   * @param {object} req - Request sent to the route
   * @param {object} res - Response sent from the controller
   * @param {object} next - Error handler
   * @returns {object} - object representing response message
   */
  static async fetchData(req, res, next) {
    try {
      let response = await fetch(`https://api.covid19api.com/summary`);
      const data = await response.json();
      const result = JSON.stringify(data);

      const redisData = await jsonCache.set('data', result);

      return res.status(200);
    } catch (error) {
      return next(error);
    }
  }
}

export default FetchingData;