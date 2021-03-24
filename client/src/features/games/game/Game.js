import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import GameBoard from "../gameBoard/GameBoard";
import { selectCurrentGame, setCurrentGame } from "../gamesSlice";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import Loading from "../../loading/Loading";
import { selectAuth, loadUser } from "../../auth/authSlice";
import { useHistory } from "react-router-dom";

const Game = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const currentGame = useSelector(selectCurrentGame);
  const history = useHistory();
  const [loadWheel, setLoadWheel] = useState(true);
  console.log(currentGame);

  const gameID = props.match.params.game;

  useEffect(() => {
    if (!auth.user) {
      dispatch(loadUser());
    }
    if (!auth.isAuthenticated) {
      history.push("/");
    }
    dispatch(setCurrentGame(gameID));
    if (!currentGame.isLoading) {
      setTimeout(() => {
        setLoadWheel(false);
      }, 500);
    }
  }, [dispatch, gameID, auth.isAuthenticated, auth.user, history]);

  // Formats date to local time and provides day, month, and year
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

  if (loadWheel === true) {
    return <Loading />;
  } else {
    return (
      <>
        <Header />
        <div className="container-fluid gameboard">
          <div className="row">
            <h1>{formatDate(currentGame.game.gameDate)}</h1>
          </div>
          <GameBoard />
        </div>
        <Footer />
      </>
    );
  }
};

export default Game;
