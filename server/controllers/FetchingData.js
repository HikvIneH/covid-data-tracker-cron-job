import dotenv from 'dotenv';
import fetch from 'node-fetch';

import Redis from 'ioredis';
import JSONCache from 'redis-json';

const redis = new Redis();

const jsonCache = new JSONCache(redis)



// const result = await jsonCache.get('123')

dotenv.config();

// const {
//   TWILLIO_SID: accountSid,
//   TWILLIO_KEY: TwilloAuthToken,
// } = process.env;

// twilio(accountSid, TwilloAuthToken);

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
  static async fetchingData(req, res, next) {
    const twiml = new MessagingResponse();
    let q = req.body.Body;

    try {
      let response = await fetch(`https://api.covid19api.com/summary`);
      const data = await response.json();
      const result = JSON.stringify(data);

      await jsonCache.set('data', result);

      return res.status(200);
    } catch (error) {
      return next(error);
    }
  }
}

export default FetchingData;