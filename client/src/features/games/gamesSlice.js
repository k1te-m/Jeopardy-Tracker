import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import API from "../../utils/API";

const initialState = {
  newGame: {
    isPending: false,
    error: null,
    userId: "",
  },
  userGames: {
    isLoading: false,
    games: [],
    error: null,
  },
};

export const createGame = createAsyncThunk(
  "games/createGame",
  async (userId, thunkAPI) => {
    const response = await API.createGame(userId);
    return response.data;
  }
);

export const getGames = createAsyncThunk(
  "games/getGames",
  async (userId, thunkAPI) => {
    const response = await API.getMyGames();
    return response.data;
  }
);

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {},
  extraReducers: {
    [getGames.pending]: (state) => {
      state.games.userGames.isLoading = true;
    },
    [getGames.fulfilled]: (state, action) => {
      state.games.userGames.isLoading = false;
      state.games.userGames.games = action.payload;
    },
    // [getGames.rejected]: (state) => {
    //   state.games.userGames.isLoading = false;
    //   state.games.userGames.error = "Error fetching games.";
    // },
    [createGame.pending]: (state) => {
      state.games.newGame.isPending = true;
    },
    [createGame.fulfilled]: (state, action) => {
      state.games.newGame.isPending = false;
      state.games.userGames.games.push(action.payload);
    },
    [createGame.rejected]: (state) => {
      state.games.newGame.isPending = false;
      state.games.newGame.error = "Error creating game. Please try again.";
    },
  },
});

export const selectGames = (state) => state.games;

export default gamesSlice.reducer;
