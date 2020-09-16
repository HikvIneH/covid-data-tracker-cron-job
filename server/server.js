import dotenv from 'dotenv';
import fetch from 'node-fetch';
import Redis from 'ioredis';
import JSONCache from 'redis-json';
import express from 'express';

dotenv.config();

let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

const redis = new Redis(REDIS_URL);

const jsonCache = new JSONCache(redis)

const app = express();
const { PORT = 3000 } = process.env;

console.log("---------------------");
console.log("Running Job");

let response = await fetch(`https://api.covid19api.com/summary`);
const data = await response.json();
const result = JSON.stringify(data);
await jsonCache.set('data', result);
console.log("Get Data");
await jsonCache.get('data');

console.log("Done");
console.log("---------------------");

app.listen(PORT, () => console.log(`Running on ${PORT}`));
