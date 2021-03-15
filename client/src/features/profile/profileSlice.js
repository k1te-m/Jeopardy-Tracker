import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../utils/API";

const initialState = {
  user: {},
  games: [],
  isLoading: false,
  error: null,
};

export const setUserProfile = createAsyncThunk(
  "profile/setUserProfile",
  async (username, thunkAPI) => {
    const response = await API.getUserProfile(username);
    return response.data;
  }
);

export const getProfileGames = createAsyncThunk(
  "profile/getProfileGames",
  async (username, thunkAPI) => {
    const response = await API.getProfileGames(username);
    return response.data;
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: {
    [setUserProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [setUserProfile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [setUserProfile.rejected]: (state) => {
      state.isLoading = false;
      state.error = "Error fetching user profile.";
    },
    [getProfileGames.pending]: (state) => {
      state.isLoading = true;
    },
    [getProfileGames.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.games = action.payload;
      state.error = null;
    },
    [getProfileGames.rejected]: (state) => {
      state.isLoading = false;
      state.error = "Error fetching profile games.";
    },
  },
});

export const selectProfile = (state) => state.profile;
export const selectProfileLoading = (state) => state.profile.isLoading;
export const selectProfileError = (state) => state.profile.error;

export default profileSlice.reducer;
