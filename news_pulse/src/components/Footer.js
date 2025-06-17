import React from "react";

// PUBLIC_INTERFACE
/**
 * Footer: Copyright and branding
 */
function Footer() {
  return (
    <footer className="footer">
      &copy; {new Date().getFullYear()} NewsPulse &middot; Powered by React
    </footer>
  );
}

export default Footer;
