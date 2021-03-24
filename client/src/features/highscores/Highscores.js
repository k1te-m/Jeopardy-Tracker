import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHighScores, selectHighScores } from "../games/gamesSlice";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { useHistory } from "react-router-dom";

const Highscores = () => {
  const dispatch = useDispatch();
  const scores = useSelector(selectHighScores);
  let history = useHistory();

  useEffect(() => {
    dispatch(getHighScores());
  }, [dispatch]);

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

  // Formats numbers to add appropriate commas
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const highScores = scores.map((score) => (
    <li>
      <div className="card text-center">
        <div className="card-body">
          <h3 className="card-title">
            <button
              className="user-profile"
              onClick={() => {
                history.push(`/profile/${score.username}`);
              }}
            >
              {score.username}
            </button>
          </h3>
          <h5 className="card-subtitle">{formatDate(score.gameDate)}</h5>
          <p className="card-text gold">${numberWithCommas(score.score)}</p>
        </div>
      </div>
    </li>
  ));

  return (
    <>
      <Header />
      <div className="container highscore">
        <div className="row">
          <h1>High Scores</h1>
        </div>
        <div className="row justify-content-center">
          <ol className="row justify-content-center">{highScores}</ol>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Highscores;
