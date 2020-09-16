import FetchingData from './controllers/FetchingData';
import cron from 'node-cron';
import express from 'express';
import fs from 'fs';

const app = express();

console.log('test');

// schedule tasks to be run on the server
// * * * * * *
// cron.schedule("* 5 * * *", function() {
//   console.log("---------------------");
//   console.log("Running Cron Job");
//   fs.unlink("./error.log", err => {
//     if (err) throw err;
//     console.log("Error file succesfully deleted");
//   });
// });

app.listen("3128");