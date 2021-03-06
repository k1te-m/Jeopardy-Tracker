import axios from "axios";

export default {
  getMyGames: async (id) => {
    return await axios.get("/api/game/" + id);
  },
  createGame: async (data) => {
    return await axios.post("/api/game", data);
  },
  getGameById: async (id) => {
    return await axios.get("/api/game/set/" + id);
  },
  updateScore: async (id, data) => {
    return await axios.put("/api/game/save/" + id, data);
  },
  getUserProfile: async (username) => {
    return await axios.get("/api/user/" + username);
  },
  getProfileGames: async (username) => {
    return await axios.get("/api/user/games/" + username);
  },
  getHighScores: async () => {
    return await axios.get("/api/game");
  },
  followUser: async (id, data) => {
    return await axios.put("/api/follow/" + id, data);
  },
};
