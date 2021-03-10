import React from "react";
import { useSelector } from "react-redux";
import { selectUserGames, selectUserGamesLoading } from "../gamesSlice";

const GameList = () => {
  const gamesLoading = useSelector(selectUserGamesLoading);
  const userGames = useSelector(selectUserGames);

  console.log(userGames);

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
    console.log("Games populated.");
    userGameList = userGames.map((game) => (
      <div className="card" key={game._id}>
        <div className="card-body">
          <h3 className="card-title">{formatDate(game.date)}</h3>
          <h5 className="card-subtitle">Winnings: ${game.score}</h5>
        </div>
      </div>
    ));
  }

  return userGameList;
};

export default GameList;
