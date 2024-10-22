import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Beer } from "../types/types";

interface BeerState {
  beers: Beer[];
  loading: boolean;
}

const initialState: BeerState = {
  beers: [],
  loading: false,
};

const beerSlice = createSlice({
  name: "beers",
  initialState,
  reducers: {
    setBeers(state, action: PayloadAction<Beer[]>) {
      state.beers = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setBeers, setLoading } = beerSlice.actions;
export default beerSlice.reducer;
