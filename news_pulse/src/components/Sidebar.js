import React from "react";

// PUBLIC_INTERFACE
/**
 * Sidebar: List of categories
 * Props:
 * - categories: array of strings
 * - selectedCategory: string
 * - onSelectCategory: function(cat: string)
 */
function Sidebar({ categories, selectedCategory, onSelectCategory }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">Categories</div>
      <ul className="sidebar-list">
        {categories.map((cat) => (
          <li className="sidebar-list-item" key={cat}>
            <button
              className={
                "sidebar-list-btn" +
                (cat === selectedCategory ? " selected" : "")
              }
              onClick={() => onSelectCategory(cat)}
              aria-current={cat === selectedCategory ? "page" : undefined}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
