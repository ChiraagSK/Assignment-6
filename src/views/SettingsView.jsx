import React, { useState } from "react";
import { useStoreContext } from "../context/index";
import { useNavigate } from "react-router-dom";
import "./SettingsView.css";

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


const SettingsView = () => {
    const navigate = useNavigate();
  const { fName, setFName, lName, setLName, email, selectedGenre, setSelectedGenre } =
    useStoreContext();

  const [formState, setFormState] = useState({
    firstName: fName,
    lastName: lName,
    preferredGenres: selectedGenre,
  });

  const handleGenreChange = (id) => {
    setFormState((prevState) => ({
      ...prevState,
      preferredGenres: prevState.preferredGenres.includes(id)
        ? prevState.preferredGenres.filter((genre) => genre !== id)
        : [...prevState.preferredGenres, id],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFName(formState.firstName);
    setLName(formState.lastName);
    setSelectedGenre(formState.preferredGenres);
    alert("Settings updated successfully!");
    navigate("/movies");

  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={formState.firstName}
            onChange={(e) =>
              setFormState({ ...formState, firstName: e.target.value })
            }
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={formState.lastName}
            onChange={(e) =>
              setFormState({ ...formState, lastName: e.target.value })
            }
          />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} disabled />
        </div>
        <div>
          <label>Preferred Genres:</label>
          <div className="genres-selection">
            {genres.map((genre) => (
              <label key={genre.id}>
                <input
                  type="checkbox"
                  value={genre.id}
                  onChange={() => handleGenreChange(genre.id)}
                  checked={formState.preferredGenres.includes(genre.id)}
                />
                {genre.name}
              </label>
            ))}
          </div>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default SettingsView;