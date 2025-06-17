# NewsPulse Backend Proxy Setup

This project includes a minimal Express.js backend server to proxy requests to the News API,
avoiding CORS issues and securing the News API key.

## Usage

1. **Install Node dependencies (from project root):**

   ```
   npm install express node-fetch cors dotenv
   ```

2. **Create a `.env` file in the root:**

   ```
   cp .env.example .env
   ```
   Edit `.env` and set your News API key.

3. **Run the backend server:**
   ```
   node server.js
   ```
   By default, this listens on port 4000.

4. **Frontend (React app) requests news via:**  
   `GET http://localhost:4000/api/news?category=world&q=bitcoin`

## How it works

- `/api/news`: Accepts `category`, `q`, or other news API query params; proxies to NewsAPI.org; returns data as JSON.
- CORS is enabled for all origins for development.
- API key is never exposed to the frontend.

## Note

- Requires Node.js 14+
- You can change the backend port in `.env`.

---
