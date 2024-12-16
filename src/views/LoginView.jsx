import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context/index";
import "./LoginView.css";

const LoginView = () => {
  const { loginUser } = useStoreContext(); // Access loginUser from Context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Attempt to log the user in
    const isAuthenticated = loginUser(email, password);

    if (isAuthenticated) {
      alert("Login successful!");
      navigate("/movies"); // Redirect to the movies page after login
    } else {
      alert("Invalid email or password."); // Show error for invalid credentials
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginView;