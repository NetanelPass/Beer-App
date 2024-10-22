import React from "react";
import BeerPage from "./BeerPage";

const FavoriteBeers: React.FC = () => {
  return <BeerPage isFavoritesPage={true} />;
};

export default FavoriteBeers;
