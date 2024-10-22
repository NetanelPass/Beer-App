import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  beerId: number | null;
}

const initialState: ModalState = {
  isOpen: false,
  beerId: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<number>) {
      state.isOpen = true;
      state.beerId = action.payload;
    },
    closeModal(state) {
      state.isOpen = false;
      state.beerId = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
