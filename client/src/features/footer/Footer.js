import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../auth/authSlice";

const Footer = () => {
  const auth = useSelector(selectAuth);
  const history = useHistory();

  return (
    <div className="container-fluid">
      <div className="row row-cols-3">
        <Link to="/">Home</Link>
        {auth.user && (
          <button
            onClick={() => {
              history.push(`/profile/${auth.user.username}`);
            }}
          >
            Profile
          </button>
        )}
        <a
          href="https://standuptocancer.org/research/research-portfolio/dream-teams/transforming-pancreatic-cancer-dream-team/"
          target="_blank"
          rel="noreferrer"
        >
          SU2C - Pancreatic Cancer Research
        </a>
        <a
          href="https://www.jeopardy.com/contestant-zone"
          target="_blank"
          rel="noreferrer"
        >
          Current Jeopardy Contestants
        </a>
      </div>
    </div>
  );
};

export default Footer;
