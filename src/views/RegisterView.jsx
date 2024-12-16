import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context/index";
import "./RegisterView.css";

const genres = [
  { name: "Action", id: 28 },
  { name: "Comedy", id: 35 },
  { name: "Animation", id: 16 },
  { name: "Adventure", id: 12 },
  { name: "Crime", id: 80 },
  { name: "Documentary", id: 99 },
  { name: "Drama", id: 18 },
  { name: "Family", id: 10751 },
  { name: "Fantasy", id: 14 },
  { name: "History", id: 36 },
  { name: "Horror", id: 27 },
  { name: "Music", id: 10402 },
  { name: "Mystery", id: 9648 },
  { name: "Romance", id: 10749 },
  { name: "Sci-Fi", id: 878 },
  { name: "TV-Movie", id: 10770 },
  { name: "Thriller", id: 53 },
  { name: "War", id: 10752 },
  { name: "Western", id: 37 },
];

const RegisterView = () => {
  const { registerUser } = useStoreContext(); // Access the registerUser function
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    selectedGenres: [],
  });

  const navigate = useNavigate();

  // Update form data on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle genre selection
  const handleGenreChange = (id) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedGenres: prevData.selectedGenres.includes(id)
        ? prevData.selectedGenres.filter((genre) => genre !== id)
        : [...prevData.selectedGenres, id],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, confirmPassword, selectedGenres } =
      formData;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      alert("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (selectedGenres.length < 10) {
      alert("Please select at least 10 genres.");
      return;
    }

    // Register the user in context
    registerUser({
      firstName,
      lastName,
      email,
      password,
      selectedGenres,
    });

    alert("Registration successful! Please log in.");
    navigate("/login"); // Navigate to login page
    console.log(firstName,lastName,email,password);
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
        />

        <div className="genres-selection">
          <h3>Select Your Preferred Genres:</h3>
          {genres.map((genre) => (
            <label key={genre.id}>
              <input
                type="checkbox"
                value={genre.id}
                onChange={() => handleGenreChange(genre.id)}
                checked={formData.selectedGenres.includes(genre.id)}
              />
              {genre.name}
            </label>
          ))}
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterView;