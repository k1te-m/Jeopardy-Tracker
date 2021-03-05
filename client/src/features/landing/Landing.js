import React, { useEffect, useContext } from "react";
import "../../sass/main.scss";

const Landing = () => {
  return (
    <div className="container landing">
      <div className="row">
        <div className="col-12">
          <h1>Welcome to Jeopardy! Tracker.</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h5>
            Login to track your daily scores, compare with friends, and enhance
            your Jeopardy! experience.
          </h5>
        </div>
      </div>
      <div className="row login">
        <button className="button">Signup</button>
      </div>
      <div className="row login">
        <button className="button">Login</button>
      </div>
    </div>
  );
};

export default Landing;
