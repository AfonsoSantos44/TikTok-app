import axios from 'axios';

const RAPID_API_URL = 'https://tiktok-scraper7.p.rapidapi.com/feed/list';

function ensureConfig() {
  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST || 'tiktok-scraper7.p.rapidapi.com';

  if (!apiKey) {
    throw new Error('Missing RAPIDAPI_KEY. Add it to your environment to fetch real TikTok data.');
  }

  return { apiKey, apiHost };
}

export async function getTrendingFeed({ count, region }) {
  const { apiKey, apiHost } = ensureConfig();

  const response = await axios.get(RAPID_API_URL, {
    params: {
      region,
      count,
    },
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': apiHost,
    },
    timeout: 15000,
  });

  const payload = response.data;
  if (!payload || payload.code !== 0 || !Array.isArray(payload.data)) {
    throw new Error(payload?.msg || 'TikTok API returned an unexpected response shape.');
  }

  return {
    source: 'live',
    items: payload.data,
  };
}
