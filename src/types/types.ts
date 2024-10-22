export interface Beer {
  id: number;
  name: string;
  imageUrl: string;
  foodPairing: string[];
  price: string;
  rating: {
    average: number;
    reviews: number;
  };
}
/**
 * Props for the BeerCard component.
 */
export interface BeerProps {
  beer: Beer;
  onToggleFavorite: (id: number) => void;
}

/**
 * Props for the BeerGrid component.
 */
export interface BeerGridProps {
  beers: Beer[];
  onToggleFavorite: (id: number) => void;
}

/**
 * Props for the BeerPage component.
 */
export interface BeerPageProps {
  isFavoritesPage: boolean;
}