import React from "react";
import { useStoreContext } from "../context/index";
// import "./CartView.css";
import { useNavigate } from "react-router-dom";

const CartView = () => {
  const { cart, setCart } = useStoreContext();

  const handleRemoveFromCart = (movieId) => {
    setCart((prevCart) => prevCart.delete(movieId));
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.size === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((movie, movieId) => (
            <li key={movieId} className="cart-item">
              <img src={movie.trailerImage} alt={movie.title} />
              <div className="cart-item-details">
                <h3>{movie.title}</h3>
                <button onClick={() => handleRemoveFromCart(movieId)}>Remove</button>
              </div>
            </li>
          )).toArray()}
        </ul>
      )}
    </div>
  );
};

export default CartView;