import React from "react";
import "../../sass/main.scss";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <div className="container-fluid landing">
        <div className="row header">
          <div className="col-12">
            <h1>Welcome to Jeopardy! Tracker.</h1>
          </div>
        </div>
        <div className="row subtext">
          <div className="col-12">
            <h5>
              Login to track your daily scores, compare with friends, and
              enhance your Jeopardy! experience.
            </h5>
          </div>
        </div>
        <div className="row login">
          <Link to="/signup">
            <button className="button btn">Signup</button>
          </Link>
        </div>
        <div className="row login">
          <Link to="/login">
            <button className="button btn">Login</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Landing;
