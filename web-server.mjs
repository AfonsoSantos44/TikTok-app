import express from 'express';
import { getTrendingFeed } from './web-services.mjs';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/trending', async (req, res) => {
  const count = Number.parseInt(req.query.count, 10) || 10;
  const region = String(req.query.region || 'US').toUpperCase();

  if (count < 1 || count > 50) {
    return res.status(400).json({ error: 'count must be between 1 and 50' });
  }

  try {
    const data = await getTrendingFeed({ count, region });
    return res.json(data);
  } catch (error) {
    const status = error.message.includes('RAPIDAPI_KEY') ? 500 : 502;

    return res.status(status).json({
      error: 'Failed to fetch trending data',
      details: error.message,
    });
  }
});

app.get('/', (_req, res) => {
  res.sendFile('index.html', { root: './public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
