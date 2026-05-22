<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and Deploy Your AI Studio App

This project contains everything you need to run, customize, and deploy your AI Studio application locally using Node.js and the Gemini API.

View your live app in AI Studio:  
https://ai.studio/apps/c5790124-c169-46c8-9a1c-51dc353df8c0

## Features

- Gemini AI integration
- Fast local development setup
- Modern AI Studio project structure
- Easy deployment workflow
- Custom UI support with Google Stitch
- Environment-based API key configuration

## Google Stitch Design

This project also includes a connected Google Stitch design prototype for UI/UX workflow and interface inspiration:

https://stitch.withgoogle.com/projects/1644334008395246009

## Run Locally

### Prerequisites

Make sure you have the following installed:

- Node.js (latest LTS recommended)
- npm

## Installation

1. Clone the repository

```bash
git clone <your-repository-url>
cd Windows-98-themed-To-Do-list
npm install
```

2. Create a local environment file

```bash
cp .env.example .env.local
```

Add your Supabase values:

```bash
VITE_SUPABASE_URL="https://your-project-ref.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="your-public-publishable-key"
```

3. Start the app

```bash
npm run dev
```

## Supabase Setup

1. Create a Supabase project.
2. Open the SQL Editor.
3. Run the SQL from `supabase-schema.sql`.
4. Copy your Project URL and publishable key from the Supabase dashboard into `.env.local`.

The app stores tasks in `public.tasks` and reminders in `public.reminders`. It keeps the built-in demo data as a fallback, and seeds it into Supabase the first time those tables are empty.

The included policies allow public read and write access with the browser publishable/anon key. That is fine for a personal demo, but add Supabase Auth and user-specific RLS policies before using this for private data.

## Deploy To Vercel

1. Push this project to GitHub.
2. Import the GitHub repo in Vercel.
3. Keep the default Vite settings:

```text
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

4. Add these Environment Variables in Vercel Project Settings:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

5. Redeploy after adding or changing environment variables.
