import React from "react";

// PUBLIC_INTERFACE
/**
 * NewsCard: Displays an article card
 * Props:
 * - article: { id, title, summary, author, publishedAt, image, url }
 */
function NewsCard({ article }) {
  return (
    <div className="news-card" role="listitem">
      {article.image && (
        <img
          className="news-img"
          src={article.image}
          alt={article.title}
          loading="lazy"
        />
      )}
      <div className="news-info">
        <div className="news-title">{article.title}</div>
        <div className="news-summary">{article.summary}</div>
        <div className="news-meta">
          {article.author} &mdash;{" "}
          {new Date(article.publishedAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
        <a
          className="news-link"
          href={article.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          Read more &rarr;
        </a>
      </div>
    </div>
  );
}

export default NewsCard;
