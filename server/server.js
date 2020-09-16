import FetchingData from './controllers/FetchingData';
import cron from 'node-cron';
import express from 'express';
import fs from 'fs';

const app = express();

console.log("---------------------");
console.log("Running Cron Job");
FetchingData.fetchData();

app.listen("3128");