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

export const getGames = createAsyncThunk(
  "games/getGames",
  async (userId, thunkAPI) => {
    const response = await API.getMyGames(userId);
    return response.data;
  }
);

export const createGame = createAsyncThunk(
  "games/createGame",
  async (userId, thunkAPI) => {
    const response = await API.createGame(userId);
    return response.data;
  }
);

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {},
  extraReducers: {
    [getGames.pending]: (state) => {
      state.userGames.isLoading = true;
    },
    [getGames.fulfilled]: (state, action) => {
      state.userGames.isLoading = false;
      state.userGames.games = action.payload;
    },
    [getGames.rejected]: (state) => {
      state.userGames.isLoading = false;
      state.userGames.error = "Error fetching games.";
    },
    [createGame.pending]: (state) => {
      state.newGame.isPending = true;
    },
    [createGame.fulfilled]: (state, action) => {
      state.newGame.isPending = false;
      state.userGames.games.push(action.payload);
    },
    [createGame.rejected]: (state) => {
      state.newGame.isPending = false;
      state.newGame.error = "Error creating game. Please try again.";
    },
  },
});

export const selectGames = (state) => state.games;

export default gamesSlice.reducer;
