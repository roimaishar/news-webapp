# Daily News Brief Web App

A modern web application that displays AI-curated news briefs with real-time updates, built with Vue 3, Nuxt 4, and Supabase.

## Features

- 📰 **AI-Curated News**: Displays news from 15 international sources, curated by GPT-5
- 🔴 **Israel-Relevant Filtering**: Separates Israel-relevant news from general coverage
- 🌍 **Multi-Language Support**: Hebrew, Arabic, and English
- ⚡ **Real-Time Updates**: Auto-refreshes when new briefs are published (via Supabase Realtime)
- 📱 **Mobile-Responsive**: Optimized for all screen sizes
- 🔄 **RTL Support**: Proper right-to-left layout for Hebrew and Arabic
- 🚀 **Zero-Cost Deployment**: Runs on Vercel's free tier

## Tech Stack

- **Frontend**: Vue 3 (Composition API) + Nuxt 4
- **Styling**: Tailwind CSS
- **Database**: Supabase PostgreSQL
- **Real-Time**: Supabase Realtime (WebSocket)
- **Hosting**: Vercel
- **Language**: TypeScript

## Prerequisites

- Node.js 20+ (use `nvm use 22`)
- Supabase account with existing news database
- Vercel account (for deployment)

## Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:

```env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

You can find these values in your Supabase project settings:
- Go to https://app.supabase.com
- Select your project
- Go to Settings > API
- Copy the Project URL and anon/public key

### 3. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Set environment variables:
```bash
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY
```

5. Deploy to production:
```bash
vercel --prod
```

### Option 2: Deploy via GitHub

1. Push code to GitHub
2. Connect to Vercel at https://vercel.com/new
3. Import your GitHub repository
4. Add environment variables
5. Deploy!

## Project Structure

```
news-webapp/
├── app/app.vue              # Root app component
├── components/              # Vue components
├── composables/             # Composables (real-time updates)
├── pages/index.vue          # Main page
├── server/api/              # API endpoints
├── types/                   # TypeScript types
└── nuxt.config.ts           # Nuxt configuration
```

## API Endpoints

### GET /api/brief/latest

Fetches the latest curated news brief.

**Query Parameters:**
- `language` (optional): Target language (`he`, `ar`, or `en`). Default: `he`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SUPABASE_URL` | Supabase project URL | ✅ |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ |

## Cost

**Total: $0/month** (Vercel free tier + existing Supabase)
