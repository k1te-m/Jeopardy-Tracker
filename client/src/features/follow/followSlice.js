import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../utils/API";

const initialState = {
  userFollowing: {
    isLoading: false,
    following: [],
    error: null,
  },
  userFollowers: {
    isLoading: false,
    followers: [],
    error: null,
  },
};

export const followUser = createAsyncThunk(
  "follow/followUser",
  async ({ username, id }, thunkAPI) => {
    const response = await API.followUser(id, { username, id });
    return response.data;
  }
);

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {},
  extraReducers: {
    [followUser.pending]: (state) => {
      state.userFollowing.isLoading = true;
    },
    [followUser.fulfilled]: (state, action) => {
      state.userFollowing.isLoading = false;
      state.userFollowing.following = action.payload;
    },
    [followUser.rejected]: (state) => {
      state.userFollowing.isLoading = false;
      state.userFollowing.error = "Error following user.";
    },
  },
});

// Selectors
export const selectFollow = (state) => state.follow;

export default followSlice.reducer;
