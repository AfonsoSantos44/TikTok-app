# TikTok Trend Intelligence

A simple web app for creators to inspect TikTok trending videos, evaluate engagement signals,
and decide what trend formats to test next.

## What is improved

- Secure architecture: API key moved from client code to server-side endpoint (`/api/trending`).
- Better UX: dashboard with region selector, top-N selector, metric cards, and ranked video cards.
- Actionable insights: calculated sample totals, average views, engagement rate, and a custom trend score.
- Local development fallback: works in mock mode when no RapidAPI key is configured.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables (optional)

If you want real live data from RapidAPI:

- `RAPIDAPI_KEY`: your API key
- `RAPIDAPI_HOST` (optional): defaults to `tiktok-scraper7.p.rapidapi.com`

Example:

```bash
RAPIDAPI_KEY=your_key_here npm run dev
```
