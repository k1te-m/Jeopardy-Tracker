import React, { useEffect } from "react";
import LogoutButton from "../logout/LogoutButton";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, LOGOUT, loadUser } from "../auth/authSlice";
import { getGames } from "../games/gamesSlice";
import AddNewGame from "../games/addnewgame/AddNewGame";
import GameList from "../games/gamelist/GameList";
const Dashboard = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  useEffect(() => {
    if (!auth.user) {
      dispatch(loadUser());
    }
    dispatch(getGames(auth.user._id));
  }, [auth.user, dispatch]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-9">
          <h3>Welcome, {auth.user.username}!</h3>
        </div>
        <div className="col-3">
          <div className="row">
            <LogoutButton logout={() => dispatch(LOGOUT())} />
          </div>
          <span>New Game</span> <AddNewGame />
        </div>
      </div>
      <div className="row">
        <GameList />
      </div>
    </div>
  );
};

export default Dashboard;
