import express from 'express';
import bodyParser from 'body-parser';
import path from 'path'

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

app.listen(PORT, () => console.info(`Server is running on http://localhost:${PORT}`));
