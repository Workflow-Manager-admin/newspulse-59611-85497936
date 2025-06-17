import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * Header Banner: Shows brand, search, and auth button
 * Props:
 * - user: user object or null
 * - onLogout: function
 * - onSearch: function
 * - brand: string
 * - accentColor: string
 */
function Header({ user, onLogout, onSearch, brand }) {
  const [query, setQuery] = useState("");

  const handleInput = (e) => setQuery(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <header className="header">
      <div className="header-content">
        <span className="header__brand">
          <span className="header__brand-symbol">📰</span>
          {brand}
        </span>
        <form className="header__search-wrap" onSubmit={handleSubmit} role="search" aria-label="Search News">
          <input
            className="header__search"
            placeholder="Search news…"
            value={query}
            onChange={handleInput}
            aria-label="Search news"
            />
          <button className="header__login-btn" style={{background: "var(--accent)", color: "#222", fontSize:"1.13rem"}} type="submit">&#128269;</button>
        </form>
        <div className="header__user">
          {user ? (
            <>
              <span>Hi, <b>{user.username}</b></span>
              <button className="header__logout-btn" onClick={onLogout} aria-label="Logout">
                Logout
              </button>
            </>
          ) : (
            <span style={{color: "var(--secondary)"}}>Not signed in</span>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
