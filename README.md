# Cinema Watch — MVP

A minimal cinematic video-watching frontend.

## Stack
- React
- Vite
- Lucide React
- Plain CSS

## Run locally
1. Install Node.js 20+.
2. Open a terminal in this folder.
3. Run:
   npm install
   npm run dev
4. Open the local URL shown by Vite.

## Demo video
The starter player uses a public MP4 from MDN. Replace `DEMO_VIDEO` in `src/main.jsx` with your own HTTPS video URL later.

## Telegram links
The frontend already loads for any path such as `/watch/abc123` because the MVP currently renders the same demo player. In the next stage, a video database/manifest and routing will map each ID to its own video.

## Free deployment
Recommended later: Cloudflare Pages connected to GitHub. Build command: `npm run build`. Output directory: `dist`.

## Important
This is intentionally the first frontend-only stage. Uploading, authentication, video storage, unique link generation, and an admin panel should be added as a separate backend/storage stage.
