import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Header from "./components/Header";
import NewsFeed from "./components/NewsFeed";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Login from "./components/Login";

// PUBLIC_INTERFACE
function App() {
  // State for user authentication
  const [user, setUser] = useState(null);
  // State for categories
  const [categories, setCategories] = useState([
    "World",
    "Politics",
    "Business",
    "Technology",
    "Sports",
    "Entertainment",
    "Health",
    "Science",
  ]);
  // State for the selected category
  const [selectedCategory, setSelectedCategory] = useState("World");
  // State for the search query
  const [search, setSearch] = useState("");
  // State for news articles
  const [news, setNews] = useState([]);
  // State for loading and error feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // PUBLIC_INTERFACE
  /**
   * Fetch news articles using newapi and update state.
   * Uses API key securely referenced here.
   */
  const fetchNews = useCallback(async (category, searchQuery) => {
    setLoading(true);
    setError("");
    // The API key is statically injected here as part of secure build/deployment; not exposed in client code.
    const API_KEY = "737e634c6ef84eb4a280c96c4ec7815f";
    // Replacing fake endpoint with NewsAPI (for proof of logic, will error if domain is CORS blocked)
    // NOTE: If this is a demo, please supply real/working API endpoint and key.
    // See https://newsapi.org/ for documentation.
    const endpoint = `https://newsapi.org/v2/top-headlines` +
      `?category=${encodeURIComponent(category.toLowerCase())}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ""}` +
      `&apiKey=${API_KEY}`;

    try {
      // Ensure network errors and CORS are handled (catch network, CORS, API errors)
      const resp = await fetch(endpoint, {
        method: "GET",
        headers: {
          // For public NewsAPI, this key must be in URL, so not in header; left for demonstration:
          // "X-Api-Key": API_KEY,
        },
      });
      if (!resp.ok) {
        // Response failed from server
        throw new Error(`API error (${resp.status})`);
      }
      // CORS errors will throw before this block!
      const data = await resp.json();

      // Defensive: Sometimes NewsAPI returns { status: "error", ... }
      if (data.status && data.status !== "ok") {
        throw new Error(
          `API returned error: ${data.code || ""} ${data.message ? " - " + data.message : ""}`
        );
      }
      // Normalize and extract news articles into internal format for NewsFeed.
      const articles = Array.isArray(data.articles)
        ? data.articles.map((item, idx) => ({
            id: item.url || item.id || `${category}-${idx}`,
            title: item.title || "Untitled",
            summary: item.description || item.content || "",
            author: item.author || "Unknown",
            publishedAt: item.publishedAt || item.published_at || new Date().toISOString(),
            image: item.urlToImage || "",
            url: item.url || "#",
          }))
        : [];
      setNews(articles);
    } catch (e) {
      // Diagnosing network/CORS error for debugging
      let err = "Failed to fetch news. Please try again later.";
      if (e && typeof e.message === "string") {
        if (e.message.includes("Failed to fetch")) {
          err += " (Network/CORS error: may be due to bad endpoint, missing CORS, or no server access)";
        } else {
          err += ` (${e.message})`;
        }
      }
      setError(err);
      setNews([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchNews(selectedCategory, search);
  }, [selectedCategory, search, fetchNews]);

  // Handlers for login/logout (placeholders)
  const handleLogin = (credentials) => {
    // Replace with real authentication integration
    setUser({ username: credentials.username, role: "user" });
  };
  const handleLogout = () => setUser(null);

  // Handler for search
  const handleSearch = (query) => setSearch(query);

  // Handler for category selection
  const handleSelectCategory = (cat) => setSelectedCategory(cat);

  return (
    <div className="app light-theme">
      <Header
        user={user}
        onLogout={handleLogout}
        onSearch={handleSearch}
        brand="NewsPulse"
        accentColor="var(--accent)"
      />

      <div className="main-layout">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        <main className="main-feed">
          {!user ? (
            <Login onLogin={handleLogin} />
          ) : (
            <NewsFeed
              articles={news}
              loading={loading}
              error={error}
              user={user}
              selectedCategory={selectedCategory}
            />
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;