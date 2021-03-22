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
          <div className="col-5 mt-1">
            <div className="row">
              <Link to="/">Home</Link>
            </div>
            <hr className="m-1" />
            {auth.user && (
              <>
                <div className="row">
                  <button
                    onClick={() => {
                      history.push(`/profile/${auth.user.username}`);
                    }}
                  >
                    Profile
                  </button>
                </div>
                <hr className="m-1" />
              </>
            )}

            <div className="row">
              <a
                href="https://standuptocancer.org/research/research-portfolio/dream-teams/transforming-pancreatic-cancer-dream-team/"
                target="_blank"
                rel="noreferrer"
              >
                SU2C - Pancreatic Cancer Research
              </a>
            </div>
            <hr className="m-1" />
            <div className="row">
              <a
                href="https://www.jeopardy.com/contestant-zone"
                target="_blank"
                rel="noreferrer"
              >
                Current Jeopardy Contestants
              </a>
            </div>
            <hr className="m-1" />
            <div className="row">
              <a
                href="https://github.com/k1te-m/Jeopardy-Tracker"
                target="_blank"
                rel="noreferrer"
              >
                GitHub Repository
              </a>
            </div>
          </div>
          <div className="col-7">
            <p className="disclaimer">
              Disclaimer: This website is in no way affiliated with Jeopardy!,
              CBS Media Ventures, or Jeopardy Productions, Inc. It is only meant
              as a tool to enhance your viewing experience.
            </p>
            <hr className="m-1" />
            <p className="donate">
              Please consider donating to the SU2C Pancreatic Cancer Research
              Fund or your charity of choice.
            </p>
          </div>
        </div>
        <div className="row">
          <span className="copyright">True Daily Double © 2021</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
