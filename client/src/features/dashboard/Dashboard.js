import React, { useEffect } from "react";
import LogoutButton from "../logout/LogoutButton";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, LOGOUT, loadUser } from "../auth/authSlice";
import { getGames, createGame } from "../games/gamesSlice";
import GameList from "../games/gamelist/GameList";
import { useHistory } from "react-router-dom";
const Dashboard = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const history = useHistory();

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
          <div className="row">
            <h3>Welcome, {auth.user.username}!</h3>
          </div>
          <div className="row">
            <button
              onClick={() => {
                history.push(`/profile/${auth.user.username}`);
              }}
            >
              Profile
            </button>
          </div>
        </div>
        <div className="col-3">
          <div className="row">
            <LogoutButton logout={() => dispatch(LOGOUT())} />
          </div>
          <div className="row">
            <span>New Game</span>
            <button
              onClick={() =>
                dispatch(
                  createGame({
                    userId: auth.user._id,
                    username: auth.user.username,
                  })
                )
              }
            >
              <i className="fas fa-plus-circle" />
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <GameList />
      </div>
    </div>
  );
};

export default Dashboard;
