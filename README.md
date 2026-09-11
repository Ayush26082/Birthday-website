# Birthday Surprise Website ❤️

A mobile-first, romantic birthday website built from the supplied photo references.

## Run locally
Open `index.html` in a browser, or run:

```bash
python -m http.server 8000
```

Then open http://localhost:8000

## Deploy
This is a static website. Upload the folder to Vercel, Netlify, GitHub Pages, or any static hosting provider.

## Personalized links
The form creates a shareable URL using query parameters, so no database is required for the demo. Example fields are encoded into the URL after clicking **Create My Birthday Surprise**.

For a production SaaS version with permanent pages, user accounts, cloud photo uploads, analytics, custom domains, and database storage, add a backend/database (e.g. Supabase/Firebase) and store each birthday page by an ID/slug.
