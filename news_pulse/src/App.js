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

  // Placeholder: fetch news articles (simulate API)
  const fetchNews = useCallback(async (category, searchQuery) => {
    setLoading(true);
    setError("");
    try {
      // Replace this block with actual API integration
      // Example: fetch(`/api/news?category=${category}&q=${searchQuery}`)
      await new Promise((resolve) => setTimeout(resolve, 600));
      const fakeResults = Array.from({ length: 6 }, (_, i) => ({
        id: `a${category.replace(/[^a-z]/gi, "").toLowerCase()}${i}`,
        title: `${category} News Headline ${i + 1}${
          searchQuery ? ` - related to "${searchQuery}"` : ""
        }`,
        summary:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae velit ex.",
        author: i % 2 === 0 ? "News Team" : "Guest Contributor",
        publishedAt: new Date().toISOString(),
        image: `https://source.unsplash.com/400x200/?${category.toLowerCase()},news,${i}`,
        url: "#",
      }));
      setNews(fakeResults);
    } catch (e) {
      setError("Failed to fetch news. Please try again.");
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