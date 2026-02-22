# TikTok Trend Intelligence

A web app for creators to inspect real TikTok trending videos, evaluate engagement signals,
and decide what trend formats to test next.

## API provider

This project uses the RapidAPI product you shared:

- API: `tiktok-api23`
- Endpoint: `GET /api/trending/video`
- Default query used by app: `page=1`, `period=30`, `order_by=vv`, `country=<selected>`, `limit=<count>`

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Export your API key in the shell before starting the server:

```bash
export RAPIDAPI_KEY=your_key_here
# Optional (defaults shown)
export RAPIDAPI_HOST=tiktok-api23.p.rapidapi.com
export PORT=3000
```

3. Start the app:

```bash
npm run dev
```

Then open `http://localhost:3000`.
