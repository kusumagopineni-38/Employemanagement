import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isLoggedIn", "true");
      setError("");
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-page">

      {/* LEFT BRANDING SECTION */}
      <div className="login-brand">
        <div className="brand-content">

          <div className="brand-icon">
            👥
          </div>

          <h1>
            Employee
            <br />
            Management
            <br />
            System
          </h1>

          <p>
            Manage employees, departments, addresses and
            reporting managers from one place.
          </p>

        </div>
      </div>

      {/* RIGHT LOGIN SECTION */}
      <div className="login-section">

        <div className="login-card">

          <div className="login-icon">
            🔐
          </div>

          <h2>Welcome Back</h2>

          <p className="login-subtitle">
            Sign in to your account
          </p>

          <form onSubmit={handleLogin}>

            {/* USERNAME */}
            <div className="form-group">
              <label>Username</label>

              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* ERROR */}
            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            {/* SIGN IN */}
            <button
              type="submit"
              className="login-button"
            >
              Sign In
            </button>

          </form>

          <div className="login-footer">
            Employee Management System
          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;