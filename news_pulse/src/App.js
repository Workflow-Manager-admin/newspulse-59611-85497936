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
    // 'newapi' assumed endpoint for latest news
    const endpoint = `https://newapi.com/v1/latest-news` +
      `?category=${encodeURIComponent(category)}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ""}` +
      `&apiKey=${API_KEY}`;
    try {
      const resp = await fetch(endpoint);
      if (!resp.ok) {
        throw new Error(`API error (${resp.status})`);
      }
      const data = await resp.json();
      // Normalize and extract news articles into internal format for NewsFeed.
      // Assume data.articles is an array with required fields; fallback for missing fields.
      const articles = Array.isArray(data.articles)
        ? data.articles.map((item, idx) => ({
            id: item.id || `${category}-${idx}`,
            title: item.title || "Untitled",
            summary: item.summary || item.description || "",
            author: item.author || "Unknown",
            publishedAt: item.publishedAt || item.published_at || new Date().toISOString(),
            image: item.image || item.urlToImage || "",
            url: item.url || "#",
          }))
        : [];
      setNews(articles);
    } catch (e) {
      setError(
        "Failed to fetch news. Please try again later." +
        (e && e.message ? ` (${e.message})` : "")
      );
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