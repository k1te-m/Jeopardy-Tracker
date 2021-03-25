import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth } from "../../auth/authSlice";
import { selectProfile } from "../profileSlice";
import { followUser } from "../../follow/followSlice";

const FollowButton = () => {
  const auth = useSelector(selectAuth);
  const profile = useSelector(selectProfile);
  const dispatch = useDispatch();

  const handleFollow = () => {
    const username = profile.user.username;
    const id = auth.user._id;

    dispatch(followUser({ username: username, id: id }));
  };

  if (auth.user.username == profile.user.username) {
    return null;
  } else if (auth.user.following.includes(profile.user.username)) {
    return <button className="button">Unfollow</button>;
  } else {
    return (
      <button
        className="button"
        onClick={() => {
          handleFollow();
        }}
      >
        Follow
      </button>
    );
  }
};

export default FollowButton;
