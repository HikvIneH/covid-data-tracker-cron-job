import FetchingData from './controllers/FetchingData';
import express from 'express';

const app = express();
const { PORT = 3000 } = process.env;

console.log("---------------------");
console.log("Running Job");
FetchingData.fetchData;
console.log("Done");
console.log("---------------------");

app.listen(PORT, () => console.log(`Running on ${PORT}`));
