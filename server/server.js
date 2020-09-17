import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import Redis from 'ioredis';
import JSONCache from 'redis-json';
import rp from 'request-promise';

const app = express();
const { PORT = 4000 } = process.env;
dotenv.config();

let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const redis = new Redis(REDIS_URL);
const jsonCache = new JSONCache(redis, {prefix: 'cache:'})
let summary;

async function fetchData() {
  try {
    let response = await fetch(process.env.API_URL);
    summary = await response.json();
    console.log("---------------------");
    console.log("Running Job");
    console.log("Store to Redis")

    await jsonCache.rewrite('data', summary);

    console.log("Done");
    console.log("---------------------");
    return summary;
  } catch (error) {
    return error;
  }
}

fetchData().then(console.log).catch(console.error);
app.listen(PORT, () => console.log(`App Listening on port ${PORT}`));
