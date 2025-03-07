import express from 'express';
import bodyParser from 'body-parser';
import path from 'path'
import {CITIES} from "./public/data/cities.data.js";
import {WEATHER_CODE} from "./public/data/weather.code.js";

const app = express();
const PORT = 5000;

let staticPath = path.join(path.resolve(), 'public');

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
})

app.get('/api/', (req, res) => {
    console.info(`Get request to endpoint '/' received.`);
    res.send('5 day Weather Forecast API');
})

app.get('/api/weather-images', (req, res) => {
    console.info(`Get request to endpoint '/weather-images' received.`);
    res.send(WEATHER_CODE);
})

app.get('/api/cities', (req, res) => {
    console.info(`Get request to endpoint '/cities' received.`);
    res.send(CITIES);
})


app.use((req, res) => {
    console.info(`{[ERROR]: Wrong endpoint.`);
    res.status(404).json({ error: 'Make sure the endpoint is correct.' });
});


await app.listen(PORT, () => console.info(`Server is running on http://localhost:${PORT}`));
