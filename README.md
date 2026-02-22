# TikTok Trend Intelligence

A web app for creators to inspect real TikTok trending videos, evaluate engagement signals,
and decide what trend formats to test next.

## Real data only

This app now requires live API data. It will not fall back to mock data.

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Export your API key in the shell before starting the server:

```bash
export RAPIDAPI_KEY=your_key_here
# Optional (defaults shown)
export RAPIDAPI_HOST=tiktok-scraper7.p.rapidapi.com
export PORT=3000
```

3. Start the app:

```bash
npm run dev
```

Then open `http://localhost:3000`.
