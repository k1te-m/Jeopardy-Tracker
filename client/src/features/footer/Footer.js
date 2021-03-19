import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../auth/authSlice";

const Footer = () => {
  const auth = useSelector(selectAuth);
  const history = useHistory();

  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <p className="disclaimer">
            Disclaimer: This website is in no way affiliated with Jeopardy!, CBS
            Media Ventures, or Jeopardy Productions, Inc. It is only meant as a
            tool to enhance your viewing experience.
          </p>
        </div>
        <div className="row">
          <p className="donate">
            Please consider donating to the SU2C Pancreatic Cancer Research Fund
            or your charity of choice.
          </p>
        </div>
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
        <div className="row mt-3">
          <p className="copyright">© 2021 True Daily Double</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
