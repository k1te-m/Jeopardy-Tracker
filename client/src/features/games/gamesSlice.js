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
    toggleFinalJeopardy: false,
  },
  highScores: {
    isLoading: false,
    scores: [],
    error: null,
  },
};

// Retrieves specific user games from db
export const getGames = createAsyncThunk(
  "games/getGames",
  async (userId, thunkAPI) => {
    const response = await API.getMyGames(userId);
    return response.data;
  }
);

// Sets current game when clicking into gameboard
export const setCurrentGame = createAsyncThunk(
  "games/setGame",
  async (id, thunkAPI) => {
    const response = await API.getGameById(id);
    return response.data;
  }
);

// Creates a new game for the user
export const createGame = createAsyncThunk(
  "games/createGame",
  async ({ userId, username, gameDate }, thunkAPI) => {
    const response = await API.createGame({
      userId: userId,
      username: username,
      gameDate: gameDate,
    });
    return response.data;
  }
);

// Updates game score with incremented or decremented value
export const updateGameScore = createAsyncThunk(
  "games/updateScore",
  async ({ id, score }, thunkAPI) => {
    const response = await API.updateScore(id, { id, score });
    return response.data;
  }
);

// Retrieves the top 10 high scores from all users
export const getHighScores = createAsyncThunk(
  "games/getHighScores",
  async (arg, thunkAPI) => {
    const response = await API.getHighScores();
    return response.data;
  }
);

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    // Toggles Double Jeopardy modal
    TOGGLE_DOUBLEJ: (state) => {
      if (state.currentGame.game.showDoubleJeopardy === false) {
        state.currentGame.game.showDoubleJeopardy = true;
      } else {
        state.currentGame.game.showDoubleJeopardy = false;
      }
    },
    // Toggles question modal
    TOGGLE_MODAL: (state) => {
      if (state.currentGame.toggleModal === false) {
        state.currentGame.toggleModal = true;
      } else {
        state.currentGame.toggleModal = false;
      }
    },
    // Toggles FJ modal
    TOGGLE_FJ: (state) => {
      if (state.currentGame.toggleFinalJeopardy === false) {
        state.currentGame.toggleFinalJeopardy = true;
      } else {
        state.currentGame.toggleFinalJeopardy = false;
      }
    },
    // Sets the question value when clue button is clicked
    SET_QUESTION_VALUE: (state, action) => {
      state.currentGame.currentQuestionValue = action.payload;
    },
    // Increments game score by question value
    INCREMENT_SCORE: (state, action) => {
      state.currentGame.game.score += action.payload;
    },
    // Decrements game score by question value
    DECREMENT_SCORE: (state, action) => {
      state.currentGame.game.score -= action.payload;
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
    [getHighScores.pending]: (state) => {
      state.highScores.isLoading = true;
    },
    [getHighScores.fulfilled]: (state, action) => {
      state.highScores.isLoading = false;
      state.highScores.scores = action.payload;
    },
    [getHighScores.rejected]: (state) => {
      state.highScores.isLoading = false;
      state.highScores.error = "Error fetching high scores. Please try again.";
    },
  },
});

export const {
  TOGGLE_DOUBLEJ,
  TOGGLE_MODAL,
  SET_QUESTION_VALUE,
  INCREMENT_SCORE,
  DECREMENT_SCORE,
  TOGGLE_FJ,
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
export const selectFinalJeopardy = (state) =>
  state.games.currentGame.toggleFinalJeopardy;
export const selectHighScores = (state) => state.games.highScores.scores;

export default gamesSlice.reducer;
