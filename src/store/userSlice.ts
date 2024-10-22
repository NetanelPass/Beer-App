import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  favorites: number[];
  ratings: { [key: number]: number };
}

const initialState: UserState = {
  favorites: [],
  ratings: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<number>) {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter((id) => id !== action.payload);
    },
    updateRating(state, action: PayloadAction<{ id: number; rating: number }>) {
      state.ratings[action.payload.id] = action.payload.rating;
    },
  },
});

export const { addFavorite, removeFavorite, updateRating } = userSlice.actions;
export default userSlice.reducer;
