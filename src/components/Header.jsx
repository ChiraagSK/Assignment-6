import React from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../context/index";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const { fName, email, setEmail, setFName } = useStoreContext();
  const { loggedInUser, logoutUser } = useStoreContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setFName("");
    setEmail("");
    logoutUser();
    alert("Logged out successfully!");
  };

  const isLoggedIn = loggedInUser?.email;

  return (
    <header>
      <h1>Cineflix</h1>
      <nav>
        {isLoggedIn ? (
          <>
          <p>Hello, {loggedInUser.firstName}!</p>
          <button onClick={() => navigate("/cart")}>Cart</button>
          <button onClick={() => navigate("/settings")}>Settings</button>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </>
        )}
      </nav>
    </header>
  );
};

export default Header;