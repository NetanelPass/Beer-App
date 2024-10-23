import React, { useState } from "react";
import { BeerProps } from "../types/types";
import { useDispatch, useSelector } from "react-redux";
import { updateRating } from "../store/userSlice";
import { openModal } from "../store/modalSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "../styles/BeerCard.css";

const defaultImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSihiT6U00hPuw3GeuMtE3EwE7ijyc65AwnIQ&s";

const BeerCard: React.FC<BeerProps> = ({
  beer,
  onToggleFavorite,
}: BeerProps) => {
  const dispatch = useDispatch();
  const [isRatingVisible, setIsRatingVisible] = useState(false);

  const favorites = useSelector((state: any) => state.user.favorites);
  const userRatings = useSelector((state: any) => state.user.ratings);

  const isFavorite = favorites.includes(beer.id);
  const userRating = userRatings[beer.id] || null;

  const handleRatingClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsRatingVisible(!isRatingVisible);
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRating = Number(e.target.value);
    dispatch(updateRating({ id: beer.id, rating: newRating }));
    setIsRatingVisible(false);
  };

  const handleFavoriteClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    onToggleFavorite(beer.id);
  };

  const handleDetailsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(openModal(beer.id));
  };
  return (
    <div className="beer-card">
      <img
        src={beer.imageUrl}
        alt={beer.name}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = defaultImage;
        }}
      />
      <h3 className="beer-name">
        {beer.name}
        <span
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          className="favorite-icon"
          style={{ cursor: "pointer" }}
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          {isFavorite ? (
            <FaHeart className="favorite-icon" />
          ) : (
            <FaRegHeart className="favorite-icon" />
          )}
        </span>
      </h3>

      <div className="rating-container">
        <button
          className="rating-button"
          onClick={handleRatingClick}
          aria-label={
            userRating === null
              ? "Rate this beer"
              : "Change your rating for this beer"
          }
        >
          {userRating === null ? "Rate this beer:" : "Change Rating"}
        </button>

        {isRatingVisible && (
          <select
            id={`rating-${beer.id}`}
            onChange={handleRatingChange}
            className="rating-select"
            onClick={(e) => e.stopPropagation()}
          >
            <option value="" disabled>
              Select rating
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        )}
        {userRating !== null && !isRatingVisible &&(
          <p className="rating-display">Your rating is: {userRating}</p>
        )}
      </div>

      <button className="details-button" onClick={handleDetailsClick}>
        More Details
      </button>
    </div>
  );
};

export default BeerCard;
