import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Genres from "../components/Genres";
import Footer from "../components/Footer";
import "./MoviesView.css";

// List of genres
const genres = [
  { name: "Action", id: 28 },
  { name: "Comedy", id: 35 },
  { name: "Animation", id: 16 },
  { name: "Adventure", id: 12 },
  { name: "Crime", id: 80 },
  // { name: 'Documentary', id: 99 },
  // { name: 'Drama', id: 18 },
  { name: "Family", id: 10751 },
  { name: "Fantasy", id: 14 },
  { name: "History", id: 36 },
  { name: "Horror", id: 27 },
  { name: "Music", id: 10402 },
  { name: "Mystery", id: 9648 },
  // { name: 'Romance', id: 10749 },
  { name: "Sci-Fi", id: 878 },
  { name: "TV-Movie", id: 10770 },
  { name: "Thriller", id: 53 },
  { name: "War", id: 10752 },
  { name: "Western", id: 37 },
];

const MoviesView = () => (
  <div className="header">
    <Header />

    <div className="main-content">
      <div className="genres-sidebar">
        <Genres genres={genres} />
      </div>

      <div className="dynamic-content">
        <Outlet />
      </div>
    </div>
    <Footer />
  </div>
);

export default MoviesView;
