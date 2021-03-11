import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GameBoard from "../gameBoard/GameBoard";
import { selectCurrentGame, setCurrentGame } from "../gamesSlice";

const Game = (props) => {
  const dispatch = useDispatch();
  const currentGame = useSelector(selectCurrentGame);

  console.log(props.match.params.game);
  const gameID = props.match.params.game;

  useEffect(() => {
    dispatch(setCurrentGame(gameID));
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <p>Game</p>
      </div>
      <GameBoard />
    </div>
  );
};

export default Game;
