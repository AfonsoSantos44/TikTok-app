// Create a local server to serve the web page
import express from 'express';
import * as web_api from './public/web/website.mjs';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use('/api', web_api.apiRouter);

app.get('/', (req, res) => {
    const indexPath = "./public/index.html"
    res.sendFile(indexPath);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

