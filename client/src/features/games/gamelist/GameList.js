import React from "react";
import { useSelector } from "react-redux";
import { selectUserGames } from "../gamesSlice";
import { useHistory } from "react-router-dom";

const GameList = () => {
  const userGames = useSelector(selectUserGames);

  let history = useHistory();

  let userGameList = <p>No games found.</p>;

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formattedDate = dateObj.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: tz,
    });
    const formattedTime = formattedDate;
    return formattedTime;
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (userGames !== []) {
    userGameList = userGames.map((game) => (
      <div className="card text-center game-card" key={game._id}>
        <div className="card-body">
          <button
            className="button game-button"
            onClick={() => {
              localStorage.setItem("game", game._id);
              history.push(`/game/${game._id}`);
            }}
          >
            <h3 className="card-title">{formatDate(game.gameDate)}</h3>
            <h5 className="card-subtitle">
              Winnings: ${numberWithCommas(game.score)}
            </h5>
          </button>
        </div>
      </div>
    ));
  } else {
    userGameList = <p>No games found.</p>;
  }

  return userGameList;
};

export default GameList;
