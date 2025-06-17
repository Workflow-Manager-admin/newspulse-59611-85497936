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
   * Fetch news articles using backend proxy and update state.
   * Frontend now sends requests to /api/news instead of direct NewsAPI.org endpoint.
   */
  const fetchNews = useCallback(async (category, searchQuery) => {
    setLoading(true);
    setError("");
    // Use backend proxy endpoint instead of direct NewsAPI.org endpoint.
    // By default, backend runs on localhost:4000. Change the port as needed.
    // The backend will append the country automatically.
    const params = new URLSearchParams();
    if (category) params.append("category", category.toLowerCase());
    if (searchQuery) params.append("q", searchQuery);
    const endpoint = `http://localhost:4000/api/news?${params.toString()}`;

    try {
      const resp = await fetch(endpoint, {
        method: "GET",
        headers: {
          // No need for API key or special headers; handled by backend
        },
      });
      if (!resp.ok) {
        throw new Error(`API error (${resp.status})`);
      }
      const data = await resp.json();

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
      let err = "Failed to fetch news. Please try again later.";
      if (e && typeof e.message === "string") {
        if (e.message.includes("Failed to fetch")) {
          err += " (Network/CORS error: is the backend running at localhost:4000?)";
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