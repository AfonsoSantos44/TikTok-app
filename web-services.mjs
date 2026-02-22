import axios from 'axios';

const RAPID_API_URL = 'https://tiktok-api23.p.rapidapi.com/api/trending/video';

function ensureConfig() {
  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST || 'tiktok-api23.p.rapidapi.com';

  if (!apiKey) {
    throw new Error('Missing RAPIDAPI_KEY. Add it to your environment to fetch real TikTok data.');
  }

  return { apiKey, apiHost };
}

function normalizeVideo(item) {
  const stats = item?.stats || {};
  const author = item?.author || {};

  return {
    aweme_id: item?.aweme_id || item?.id || '',
    title: item?.desc || item?.title || 'Untitled',
    cover: item?.video?.cover || item?.video?.originCover || item?.cover || '',
    play_count: stats.playCount ?? stats.play_count ?? item?.play_count ?? 0,
    digg_count: stats.diggCount ?? stats.digg_count ?? item?.digg_count ?? 0,
    comment_count: stats.commentCount ?? stats.comment_count ?? item?.comment_count ?? 0,
    share_count: stats.shareCount ?? stats.share_count ?? item?.share_count ?? 0,
    create_time: item?.createTime || item?.create_time || null,
    author: {
      nickname: author.nickname || author.uniqueId || author.unique_id || 'unknown creator',
    },
  };
}

function extractItems(payload) {
  if (Array.isArray(payload?.itemList)) {
    return payload.itemList;
  }

  if (Array.isArray(payload?.data?.itemList)) {
    return payload.data.itemList;
  }

  if (Array.isArray(payload?.aweme_list)) {
    return payload.aweme_list;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  return [];
}

export async function getTrendingFeed({ count, country }) {
  const { apiKey, apiHost } = ensureConfig();

  const response = await axios.get(RAPID_API_URL, {
    params: {
      page: 1,
      limit: count,
      period: 30,
      order_by: 'vv',
      country,
    },
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': apiHost,
    },
    timeout: 15000,
  });

  const payload = response.data;
  const rawItems = extractItems(payload);

  if (!rawItems.length) {
    throw new Error(payload?.message || payload?.msg || 'TikTok API returned no trending videos.');
  }

  return {
    source: 'live',
    items: rawItems.map(normalizeVideo),
  };
}
