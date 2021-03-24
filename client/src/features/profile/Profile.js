import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, loadUser } from "../auth/authSlice";
import {
  selectProfile,
  setUserProfile,
  getProfileGames,
} from "../profile/profileSlice";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useHistory } from "react-router-dom";
import ProfileChart from "./chart/ProfileChart";

const Profile = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const profile = useSelector(selectProfile);
  const history = useHistory();

  const username = props.match.params.username;

  useEffect(() => {
    if (!auth.user) {
      dispatch(loadUser());
    }
    if (!auth.isAuthenticated) {
      history.push("/");
    }
    dispatch(setUserProfile(username));
    dispatch(getProfileGames(username));
  }, [dispatch, username, auth.user, auth.isAuthenticated, history]);

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

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  let gameList = <p>No recent games found...</p>;

  const size = 5;
  const recentGames = profile.games.slice(0, size);

  const scores = profile.games.map((game) => game.score);

  const averageScores = (scores) => {
    let total = 0;
    for (let i = 0; i < scores.length; i++) {
      total += scores[i];
    }

    let average = total / scores.length;

    return average;
  };

  const userHighScore = (scores) => {
    return Math.max.apply(Math, scores);
  };

  if (profile.games.length > 0) {
    gameList = recentGames.map((game) => (
      <>
        <div className="card text-center mb-1">
          <div className="card-body">
            <h3 className="card-title">{formatDate(game.gameDate)}</h3>
            <h5 className="card-text winnings">
              Winnings: ${numberWithCommas(game.score)}
            </h5>
          </div>
        </div>
      </>
    ));
  }

  return (
    <>
      <Header />
      <div className="container profile-container">
        <div className="row">
          <h1>{profile.user.username}</h1>
        </div>
        <div className="row">
          <h5>Joined: {formatDate(profile.user.register_date)}</h5>
        </div>
        <div className="row">
          <h6>
            Largest Single Day Winnings: $
            {numberWithCommas(userHighScore(scores))}
          </h6>
        </div>
        <div className="row">
          <h6>Average Winnings: ${numberWithCommas(averageScores(scores))}</h6>
        </div>
        <hr className="w-100" />
        <div className="row">
          <p>Recent games:</p>
        </div>
        <div className="row row-cols-3 gamelist justify-content-center">
          {gameList}
        </div>
        <div className="row mt-3 mb-0 chart">
          <ProfileChart />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
