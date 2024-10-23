import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { addFavorite, removeFavorite } from "../store/userSlice";
import {
  setFilteredBeers,
  setFoodPair,
  setRatingFilter,
} from "../store/filterSlice";
import BeerGrid from "../components/BeerGrid";
import { Beer } from "../types/types";
import "../styles/BeerPage.css";
import { BeerPageProps } from "../types/types";

const ITEMS_PER_PAGE: number = 6;

const BeerPage: React.FC<BeerPageProps> = ({ isFavoritesPage }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { beers } = useSelector((state: RootState) => state.beers);
  const { filteredBeers, foodPair, ratingFilter } = useSelector(
    (state: RootState) => state.filter
  );
  const { favorites, ratings: ratingBeers } = useSelector(
    (state: RootState) => state.user
  );

  const [currentPage, setCurrentPage] = useState(0);

  const filterBeers = (beer: Beer) => {
    // Split the foodPair input by commas and trim whitespace from each item
    const foodPairsInput = foodPair
      ? foodPair.split(",").map((item) => item.trim())
      : [];

    const matchesFoodPair =
      foodPairsInput.length > 0
        ? foodPairsInput.some((inputPair) =>
            beer.foodPairing.some((pair) =>
              pair.toLowerCase().includes(inputPair.toLowerCase())
            )
          )
        : true;

    const matchesRating =
      ratingFilter !== -1 ? (ratingBeers[beer.id] ?? 0) >= ratingFilter : true;

    return matchesFoodPair && matchesRating;
  };

  function updateFilteredBeers() {
    const relevantBeers = isFavoritesPage
      ? beers.filter((beer) => favorites.includes(beer.id))
      : beers;

    const filteredIds = relevantBeers
      .filter((beer) => filterBeers(beer))
      .map((beer) => beer.id);

    dispatch(setFilteredBeers(filteredIds));
  }

  useEffect(() => {
    updateFilteredBeers();
    setCurrentPage(0);
  }, [foodPair, beers, dispatch, ratingFilter, isFavoritesPage]);

  useEffect(() => {
    if (isFavoritesPage) {
      updateFilteredBeers();
      setCurrentPage(0);
    }
  }, [favorites]);

  // Pagination logic
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBeers = beers
    .filter((beer) => filteredBeers.includes(beer.id))
    .slice(startIndex, endIndex);

  const handleToggleFavorite = (id: number) => {
    const action = favorites.includes(id)
      ? removeFavorite(id)
      : addFavorite(id);
    dispatch(action);
  };

  const handleNextPage = () => {
    if (endIndex < filteredBeers.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleFoodPairChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFoodPair(e.target.value));
  };

  const handleRatingFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    dispatch(
      setRatingFilter(isNaN(value) || value <= 0 ? -1 : Math.min(value, 5))
    );
  };
  if (isFavoritesPage && favorites.length === 0) {
    return <h1>No favorite beers selected yet.</h1>;
  }
  return (
    <div>
      <h1>{isFavoritesPage ? "Favorite Beers" : "Browse Beers"}</h1>
      {isFavoritesPage && (
        <button
          className="remove-all-button"
          onClick={() => {
            if (
              window.confirm("Are you sure you want to remove all favorites?")
            ) {
              favorites.forEach((beerId) => dispatch(removeFavorite(beerId)));
            }
          }}
        >
          Remove All
        </button>
      )}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Filter by food pairing"
          value={foodPair}
          onChange={handleFoodPairChange}
          className="filter-input"
          title="Separate food pairing ingredients with commas (e.g. BBQ Ribs, Grilled Veggies, Nachos)"
        />
        <input
          type="number"
          placeholder="Minimum rating"
          value={ratingFilter !== -1 ? ratingFilter : ""}
          onChange={handleRatingFilterChange}
          className="filter-input"
          title="Filter based on your personal rating"
        />
      </div>
      {isFavoritesPage && favorites.length === 0 ? (
        <p>
          <strong>No favorite beers selected yet.</strong>
        </p>
      ) : (
        <BeerGrid
          beers={currentBeers}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={endIndex >= filteredBeers.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BeerPage;
