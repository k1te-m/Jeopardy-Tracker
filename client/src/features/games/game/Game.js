import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GameBoard from "../gameBoard/GameBoard";
import { selectCurrentGame, setCurrentGame } from "../gamesSlice";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";

const Game = (props) => {
  const dispatch = useDispatch();
  const currentGame = useSelector(selectCurrentGame);

  const gameID = props.match.params.game;

  useEffect(() => {
    dispatch(setCurrentGame(gameID));
  }, [dispatch, gameID]);

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

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <p>{formatDate(currentGame.game.date)}</p>
        </div>
        <GameBoard />
      </div>
      <Footer />
    </>
  );
};

export default Game;
