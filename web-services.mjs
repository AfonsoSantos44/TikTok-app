import axios from 'axios';

const RAPID_API_URL = 'https://tiktok-scraper7.p.rapidapi.com/feed/list';

function getMockVideos(count, region) {
  return Array.from({ length: count }, (_, index) => {
    const seed = (index + 1) * 1300;
    return {
      aweme_id: `mock-${region}-${index + 1}`,
      title: `Mock trending idea #${index + 1} for ${region}`,
      cover: `https://picsum.photos/seed/tiktok-${region}-${index + 1}/480/640`,
      play_count: seed * 17,
      digg_count: seed,
      comment_count: Math.floor(seed * 0.19),
      share_count: Math.floor(seed * 0.13),
      create_time: Date.now() / 1000 - index * 1800,
      author: { nickname: `creator_${index + 1}` },
    };
  });
}

export async function getTrendingFeed({ count, region }) {
  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST || 'tiktok-scraper7.p.rapidapi.com';

  if (!apiKey) {
    return {
      source: 'mock',
      items: getMockVideos(count, region),
    };
  }

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

  return {
    source: 'live',
    items: response.data?.data || [],
  };
}
