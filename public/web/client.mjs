const content = document.getElementById('content');

const REGIONS = [
  ['US', 'United States'],
  ['GB', 'United Kingdom'],
  ['DE', 'Germany'],
  ['FR', 'France'],
  ['IT', 'Italy'],
  ['ES', 'Spain'],
  ['BR', 'Brazil'],
  ['CA', 'Canada'],
  ['AU', 'Australia'],
  ['JP', 'Japan'],
];

renderDashboard();

function renderDashboard() {
  content.innerHTML = `
    <section class="panel controls">
      <h2>Trend Scanner</h2>
      <form id="trend-form">
        <label>
          Region
          <select id="region">
            ${REGIONS.map(([code, name]) => `<option value="${code}">${name}</option>`).join('')}
          </select>
        </label>
        <label>
          Top videos
          <input id="count" type="number" min="1" max="50" value="10" />
        </label>
        <button type="submit">Analyze Trends</button>
      </form>
      <p id="status" class="status"></p>
    </section>

    <section id="insights" class="panel"></section>
    <section id="video-grid" class="video-grid"></section>
  `;

  document.getElementById('trend-form').addEventListener('submit', onSubmit);
}

async function onSubmit(event) {
  event.preventDefault();

  const region = document.getElementById('region').value;
  const count = Number.parseInt(document.getElementById('count').value, 10) || 10;
  const status = document.getElementById('status');

  if (count < 1 || count > 50) {
    status.textContent = 'Please choose a value between 1 and 50.';
    return;
  }

  status.textContent = 'Loading real TikTok trending videos...';

  try {
    const response = await fetch(`/api/trending?region=${region}&count=${count}`);
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.details || payload.error || `Request failed (${response.status})`);
    }

    const data = payload;
    const videos = data.items || [];

    renderInsights(videos, region);
    renderVideos(videos);

    status.textContent = `Loaded ${videos.length} videos from TikTok API.`;
  } catch (error) {
    status.textContent = `Could not load trends: ${error.message}`;
  }
}

function renderInsights(videos, region) {
  const insights = document.getElementById('insights');

  if (!videos.length) {
    insights.innerHTML = '<h3>No videos found</h3>';
    return;
  }

  const totalViews = videos.reduce((sum, video) => sum + (video.play_count || 0), 0);
  const totalEngagements = videos.reduce(
    (sum, video) => sum + (video.digg_count || 0) + (video.comment_count || 0) + (video.share_count || 0),
    0,
  );

  const avgViews = Math.round(totalViews / videos.length);
  const engagementRate = totalViews ? ((totalEngagements / totalViews) * 100).toFixed(2) : 0;

  insights.innerHTML = `
    <h2>Creator Insights (${region})</h2>
    <div class="metrics">
      <article><h3>${formatNumber(totalViews)}</h3><p>Total views in sample</p></article>
      <article><h3>${formatNumber(avgViews)}</h3><p>Average views per video</p></article>
      <article><h3>${engagementRate}%</h3><p>Engagement rate</p></article>
      <article><h3>Live API</h3><p>Data source</p></article>
    </div>
    <p class="tip">Tip: prioritize concepts from videos with high shares + comments, not only views.</p>
  `;
}

function renderVideos(videos) {
  const videoGrid = document.getElementById('video-grid');

  const ranked = [...videos].sort((a, b) => getTrendScore(b) - getTrendScore(a));

  videoGrid.innerHTML = ranked
    .map((video, index) => {
      const score = getTrendScore(video);
      return `
        <article class="video-card">
          <img src="${video.cover}" alt="${escapeHtml(video.title || 'Trending video cover')}" loading="lazy" />
          <div class="video-card-body">
            <p class="rank">#${index + 1} • Trend score ${formatNumber(score)}</p>
            <h3>${escapeHtml(video.title || 'Untitled')}</h3>
            <p class="meta">by ${escapeHtml(video.author?.nickname || 'unknown creator')}</p>
            <ul>
              <li>▶ ${formatNumber(video.play_count || 0)} views</li>
              <li>❤ ${formatNumber(video.digg_count || 0)} likes</li>
              <li>💬 ${formatNumber(video.comment_count || 0)} comments</li>
              <li>↗ ${formatNumber(video.share_count || 0)} shares</li>
            </ul>
          </div>
        </article>
      `;
    })
    .join('');
}

function getTrendScore(video) {
  return (video.play_count || 0) + (video.share_count || 0) * 4 + (video.comment_count || 0) * 3 + (video.digg_count || 0) * 2;
}

function formatNumber(value) {
  return new Intl.NumberFormat().format(value);
}

function escapeHtml(rawText) {
  return String(rawText)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
