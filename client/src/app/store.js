import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import gamesReducer from "../features/games/gamesSlice";
import gameModalReducer from "../features/games/gameModalSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    games: gamesReducer,
    gameModal: gameModalReducer,
  },
});
