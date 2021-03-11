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
};
