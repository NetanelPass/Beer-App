import { Beer } from "./types/types";

const foodPairings = [
  ["Grilled Chicken", "Fish Tacos", "Spicy Salsa"],
  ["Beef Stew", "Chocolate Cake", "Irish Soda Bread"],
  ["Spicy Wings", "Pizza", "Burgers"],
  ["BBQ Ribs", "Grilled Veggies", "Nachos"],
  ["Shrimp Tacos", "Mango Salsa", "Salads"],
  ["Fish and Chips", "Mushroom Risotto", "Cheese Platter"],
];

export async function fetchBeers(): Promise<Beer[]> {
  const response = await fetch("https://api.sampleapis.com/beers/ale");

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  return data.map((beer: any) => ({
    id: beer.id,
    name: beer.name,
    imageUrl: beer.image,
    foodPairing: foodPairings[beer.id % foodPairings.length],
    price: beer.price || "N/A",
    rating: {
      average: beer.rating.average || 0,
      reviews: beer.rating.reviews || 0,
    },
  }));
}

export {};
