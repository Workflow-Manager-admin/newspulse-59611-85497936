import React from "react";
import NewsCard from "./NewsCard";

// PUBLIC_INTERFACE
/**
 * NewsFeed: Displays list of news articles
 * Props:
 * - articles: Array of { id, title, summary, ... }
 * - loading: bool
 * - error: string
 * - user: object
 * - selectedCategory: string
 */
function NewsFeed({ articles, loading, error, selectedCategory }) {
  return (
    <div>
      <div className="feed-header">
        {selectedCategory} News
      </div>
      {loading ? (
        <div className="feed-loading">Loading news articles…</div>
      ) : error ? (
        <div className="feed-error">{error}</div>
      ) : (
        <div className="news-list" role="list">
          {articles && articles.length > 0 ? (
            articles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))
          ) : (
            <div className="feed-loading">No articles found.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default NewsFeed;
