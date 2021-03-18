import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, loadUser } from "../auth/authSlice";
import { getGames, createGame } from "../games/gamesSlice";
import GameList from "../games/gamelist/GameList";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import DatePicker from "react-datepicker";

const Dashboard = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const [gameDate, setGameDate] = useState(new Date());

  useEffect(() => {
    if (!auth.user) {
      dispatch(loadUser());
    }
    dispatch(getGames(auth.user._id));
  }, [auth.user, dispatch]);

  const submitNewGame = (e) => {
    e.preventDefault();
    dispatch(
      createGame({
        userId: auth.user._id,
        username: auth.user.username,
        gameDate: gameDate,
      })
    );
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-5">
            <h3>Welcome, {auth.user.username}!</h3>
          </div>
          <div className="col-7">
            <div className="form-group">
              <label htmlFor="gameDate">Select Game Date: </label>
              <DatePicker
                selected={gameDate}
                onChange={(date) => {
                  setGameDate(date);
                }}
                name="gameDate"
                dateFormat="MM/dd/yyyy"
                popperClassName="popper"
                popperPlacement="auto"
                popperModifiers={{
                  offset: {
                    enabled: true,
                    offset: "5px, 10px",
                  },
                  preventOverflow: {
                    enabled: true,
                    escapeWithReference: false,
                    boundariesElement: "viewport",
                  },
                }}
              />
            </div>
            <button onClick={(e) => submitNewGame(e)}>Create New Game</button>
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
