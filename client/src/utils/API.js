import axios from "axios";

export default {
  getMyGames: async () => {
    return await axios.get("/api/game");
  },
  createGame: async (data) => {
    return await axios.post("/api/game", data);
  },
};
