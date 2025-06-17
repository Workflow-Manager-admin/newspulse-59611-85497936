//
// Minimal Node.js/Express backend server to proxy news API requests and handle CORS
//

const express = require('express');
const fetch = require('node-fetch'); // External dependency!
const cors = require('cors');
require('dotenv').config(); // Loads environment variables from .env if present

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware: enable CORS for all origins (customize as needed)
app.use(cors());

// PUBLIC_INTERFACE
/**
 * Proxy endpoint for frontend: /api/news?category=...&q=...
 * Relays requests to the upstream News API (e.g., newsapi.org) using the API key from env.
 * Returns upstream data to the client (frontend).
 */
app.get('/api/news', async (req, res) => {
  // Get API key from environment for security
  const NEWS_API_KEY = process.env.NEWS_API_KEY;
  if (!NEWS_API_KEY) {
    return res.status(500).json({ error: 'Server misconfigured: No news API key set.' });
  }
  // Accept query params: category, q (query), etc.
  const { category, q } = req.query;
  const apiUrl = new URL('https://newsapi.org/v2/top-headlines');
  // You can adjust the default country here if desired:
  apiUrl.searchParams.append('country', 'us');
  if (category) apiUrl.searchParams.append('category', category);
  if (q) apiUrl.searchParams.append('q', q);
  apiUrl.searchParams.append('apiKey', NEWS_API_KEY);

  try {
    const resp = await fetch(apiUrl.href, { method: 'GET' });
    const data = await resp.json();
    res.status(resp.status).json(data);
  } catch (err) {
    res.status(502).json({ error: 'Failed to fetch news data', detail: err?.message || err });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: Date.now() });
});

// Start the server
app.listen(PORT, () => {
  console.log(`NewsPulse backend listening at http://localhost:${PORT}`);
});
