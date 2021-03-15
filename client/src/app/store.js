import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import gamesReducer from "../features/games/gamesSlice";
import alertReducer from "../features/alert/alertSlice";
import profileReducer from "../features/profile/profileSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    games: gamesReducer,
    profile: profileReducer,
    alert: alertReducer,
  },
});
