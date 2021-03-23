import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GameBoard from "../gameBoard/GameBoard";
import { selectCurrentGame, setCurrentGame } from "../gamesSlice";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import { selectAuth, loadUser } from "../../auth/authSlice";
import { useHistory } from "react-router-dom";

const Game = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const currentGame = useSelector(selectCurrentGame);
  const history = useHistory();

  const gameID = props.match.params.game;

  useEffect(() => {
    if (!auth.user) {
      dispatch(loadUser());
    }
    if (!auth.isAuthenticated) {
      history.push("/");
    }
    dispatch(setCurrentGame(gameID));
  }, [dispatch, gameID, auth.isAuthenticated, auth.user, history]);

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
          <h1>{formatDate(currentGame.game.gameDate)}</h1>
        </div>
        <GameBoard />
      </div>
      <Footer />
    </>
  );
};

export default Game;
