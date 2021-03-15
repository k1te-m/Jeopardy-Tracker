import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, loadUser, LOGOUT } from "../auth/authSlice";
import {
  selectProfile,
  setUserProfile,
  getProfileGames,
} from "../profile/profileSlice";

const Profile = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const profile = useSelector(selectProfile);

  console.log(props);

  const username = props.match.params.username;

  console.log(profile);

  useEffect(() => {
    dispatch(setUserProfile(username));
    dispatch(getProfileGames(username));
  }, [dispatch, username]);

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
    </div>
  );
};

export default Profile;