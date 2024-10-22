import React from "react";
import BeerCard from "./BeerCard";
import "../styles/BeerGrid.css";
import { BeerGridProps } from "../types/types";

const BeerGrid: React.FC<BeerGridProps> = ({
  beers,
  onToggleFavorite,
}: BeerGridProps) => {
  return (
    <div className="beer-grid">
      {beers.map((beer) => (
        <BeerCard
          key={beer.id}
          beer={beer}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default BeerGrid;
