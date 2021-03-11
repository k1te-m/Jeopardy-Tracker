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
  currentGame: {
    isLoading: false,
    game: {},
    currentQuestionValue: null,
    error: null,
    toggleModal: false,
  },
};

export const getGames = createAsyncThunk(
  "games/getGames",
  async (userId, thunkAPI) => {
    const response = await API.getMyGames(userId);
    return response.data;
  }
);

export const setCurrentGame = createAsyncThunk(
  "games/setGame",
  async (id, thunkAPI) => {
    const response = await API.getGameById(id);
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
  reducers: {
    TOGGLE_DOUBLEJ: (state) => {
      if (state.currentGame.game.showDoubleJeopardy === false) {
        state.currentGame.game.showDoubleJeopardy = true;
      } else {
        state.currentGame.game.showDoubleJeopardy = false;
      }
    },
    TOGGLE_MODAL: (state) => {
      if (state.currentGame.toggleModal === false) {
        state.currentGame.toggleModal = true;
      } else {
        state.currentGame.toggleModal = false;
      }
    },
    SET_QUESTION_VALUE: (state, action) => {
      state.currentGame.currentQuestionValue = action.payload;
    },
  },
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
    [setCurrentGame.pending]: (state) => {
      state.currentGame.isLoading = true;
    },
    [setCurrentGame.fulfilled]: (state, action) => {
      state.currentGame.isLoading = false;
      state.currentGame.game = action.payload;
    },
    [setCurrentGame.rejected]: (state) => {
      state.currentGame.isLoading = false;
      state.currentGame.error = "Error fetching game.";
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

export const {
  TOGGLE_DOUBLEJ,
  TOGGLE_MODAL,
  SET_QUESTION_VALUE,
} = gamesSlice.actions;

// Selectors
export const selectGames = (state) => state.games;
export const selectUserGamesLoading = (state) =>
  state.games.userGames.isLoading;
export const selectUserGames = (state) => state.games.userGames.games;
export const selectCurrentGame = (state) => state.games.currentGame;
export const selectModal = (state) => state.games.currentGame.toggleModal;
export const selectCurrentValue = (state) =>
  state.games.currentGame.currentQuestionValue;

export default gamesSlice.reducer;
