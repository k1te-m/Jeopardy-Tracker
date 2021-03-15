import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, loadUser } from "../auth/authSlice";
import { getGames, createGame } from "../games/gamesSlice";
import GameList from "../games/gamelist/GameList";
import Header from "../header/Header";
import Footer from "../footer/Footer";
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
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-9">
            <h3>Welcome, {auth.user.username}!</h3>
          </div>
          <div className="col-3">
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
        <div className="row">
          <GameList />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
