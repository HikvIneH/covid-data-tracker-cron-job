import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import Redis from 'ioredis';
import JSONCache from 'redis-json';
import rp from 'request-promise';

const app = express();
const { PORT = 4000 } = process.env;
dotenv.config();

const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const redis = new Redis(REDIS_URL);
const jsonCache = new JSONCache(redis, {prefix: 'cache:'})

async function fetchData() {
  try {
    const baseUrl = 'https://corona.lmao.ninja/v2/'
    const responseByCountry = await fetch(process.env.API_BASE_URL + 'countries?sort' || 'https://corona.lmao.ninja/v2/countries?yesterday&sort');
    const responseGlobal = await fetch(process.env.API_BASE_URL + 'all' || 'https://corona.lmao.ninja/v2/all?yesterday');
    const countries = await responseByCountry.json();
    const global = await responseGlobal.json();
    console.log("---------------------");
    console.log("Running Job");
    console.log("Store to Redis")

    await jsonCache.rewrite('countries', countries);
    await jsonCache.rewrite('global', global);

    console.log("Done");
    console.log("---------------------");
    return "OK";
  } catch (error) {
    return error;
  }
}

fetchData().then(console.log).catch(console.error);
app.listen(PORT, () => console.log(`App Listening on port ${PORT}`));
