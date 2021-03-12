import React from "react";
import { useSelector } from "react-redux";
import { selectUserGames, selectUserGamesLoading } from "../gamesSlice";
import { useHistory } from "react-router-dom";

const GameList = () => {
  const gamesLoading = useSelector(selectUserGamesLoading);
  const userGames = useSelector(selectUserGames);

  let history = useHistory();

  let userGameList = <p>No games found.</p>;

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formattedDate = dateObj.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      timeZone: tz,
    });
    const formattedTime = formattedDate;
    return formattedTime;
  };

  if (userGames !== []) {
    userGameList = userGames.map((game) => (
      <div className="card" key={game._id}>
        <div className="card-body">
          <a
            onClick={() => {
              localStorage.setItem("game", game._id);
              history.push(`/${game._id}`);
            }}
          >
            <h3 className="card-title">{formatDate(game.date)}</h3>
            <h5 className="card-subtitle">Winnings: ${game.score}</h5>
          </a>
        </div>
      </div>
    ));
  }

  return userGameList;
};

export default GameList;
