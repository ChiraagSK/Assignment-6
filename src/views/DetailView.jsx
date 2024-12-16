import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import { useStoreContext } from "../context/index";

const DetailView = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { cart, setCart } = useStoreContext();
  const [isInCart, setIsInCart] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const { addToCart } = useStoreContext(); // Access the addToCart function from context
  

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: {
          api_key: "411dd9da619b939a28f09f83b812595b",
          append_to_response: "videos",
        },
      })
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  useEffect(() => {
    setIsInCart(cart.has(id));
  }, [cart, id]);

  const handleBuy = () => {
    if (isInCart) {
      setCart((prevCart) => prevCart.delete(id));
    } else {
      setCart((prevCart) =>
        prevCart.set(id, {
          trailerImage: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          title: movie.title,
        })
      );
    }
    setIsInCart(!isInCart);
  };

  const goToCart = () => {
    navigate("/cart"); // Navigate to the cart page
  };

  if (!movie) return <p>Loading...</p>;

  const trailer = movie.videos.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  return (
    <div className="detail-view">
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${movie.title} Poster`}
        style={{ width: "300px" }}
      />
      <h3>Trailer:</h3>
      {trailer ? (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title="Movie Trailer"
          allowFullScreen
        ></iframe>
      ) : (
        <p>No trailer available</p>
      )}
      <button onClick={handleBuy} style={{ marginTop: "20px" }}>
        {isInCart ? "Added to Cart" : "Buy"}
      </button>
      <button
        onClick={goToCart}
        style={{ marginTop: "20px", marginLeft: "10px" }}
      >
        Go to Cart
      </button>
    </div>
  );
};

export default DetailView;
