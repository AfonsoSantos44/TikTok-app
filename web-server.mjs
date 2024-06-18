// Create a local server to serve the web page
import express from 'express';


const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    const indexPath = "./public/index.html"
    res.sendFile(indexPath);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

