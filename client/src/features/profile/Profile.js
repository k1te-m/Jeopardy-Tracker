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

  let gameList = <p>No recent games found...</p>;

  if (profile.games.length > 0) {
    gameList = profile.games.map((game) => (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{formatDate(game.date)}</h5>
          <p className="card-text">Winnings: ${game.score}</p>
        </div>
      </div>
    ));
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <h1>{profile.user.username}</h1>
        </div>
        <div className="row">
          <h5>Joined: {formatDate(profile.user.register_date)}</h5>
        </div>
        <div className="row">
          <p>Recent games:</p>
        </div>
        <div className="row">{gameList}</div>
        <div className="row">
          <ProfileChart />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
