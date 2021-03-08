import React from "react";
import { createGame, selectGames } from "../gamesSlice";
import { selectAuth } from "../../auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

const AddNewGame = () => {
  const games = useSelector(selectGames);
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  console.log(auth.user.id);

  return (
    <a onClick={() => dispatch(createGame({ userId: auth.user.id }))}>
      <i className="fas fa-plus-circle" />
    </a>
  );
};

export default AddNewGame;
