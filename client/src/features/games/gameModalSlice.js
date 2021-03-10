import { createSlice } from "@reduxjs/toolkit";

const initialState = false;
export const gameModalSlice = createSlice({
  name: "gameModal",
  initialState,
  reducers: {
    TOGGLE_MODAL: (state) => {
      return state ? false : true;
    },
  },
});

export const { TOGGLE_MODAL } = gameModalSlice.actions;

// Selector
export const selectModal = (state) => state.gameModal;

export default gameModalSlice.reducer;
