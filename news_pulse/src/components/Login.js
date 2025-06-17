import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * Login: User authentication form (placeholder)
 * Props:
 * - onLogin: function({username, password})
 */
function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError("Username and password are required.");
      return;
    }
    setError("");
    // Placeholder: Accept any login.
    onLogin({ username, password });
  }

  return (
    <div className="login-wrapper">
      <div className="login-title">Sign in to NewsPulse</div>
      <form className="login-form" onSubmit={submit} autoComplete="off">
        <input
          className="login-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
          required
          aria-label="Username"
        />
        <input
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
          aria-label="Password"
        />
        <button className="login-btn" type="submit">
          Login
        </button>
        {error && <div className="login-form-error">{error}</div>}
      </form>
    </div>
  );
}

export default Login;
