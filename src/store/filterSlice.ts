import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  filteredBeers: number[];
  foodPair: string;
  ratingFilter: number;
}

const initialState: FilterState = {
  filteredBeers: [],
  foodPair: "",
  ratingFilter: -1,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilteredBeers(state, action: PayloadAction<number[]>) {
      state.filteredBeers = action.payload;
    },
    setFoodPair(state, action: PayloadAction<string>) {
      state.foodPair = action.payload;
    },
    setRatingFilter(state, action: PayloadAction<number>) {
      state.ratingFilter = action.payload;
    },
  },
});

export const { setFilteredBeers, setFoodPair, setRatingFilter } =
  filterSlice.actions;
export default filterSlice.reducer;
