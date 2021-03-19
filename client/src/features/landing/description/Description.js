import React from "react";
import Tribute from "../tribute/Tribute";

const Description = () => {
  return (
    <div className="wrapper">
      <div className="container landing">
        <div className="row">
          <div className="col-md-7">
            <div className="row">
              <h1>Welcome to True Daily Double!</h1>
            </div>
            <div className="row">
              <div className="col">
                <h5>Watch Jeopardy!</h5>
                <img
                  className="landing-img"
                  src="../images/lamp.png"
                  alt="Watch!"
                />
              </div>
              <div className="col">
                <h5>Track scores...</h5>
                <img
                  className="landing-img"
                  src="../images/debt.png"
                  alt="Track!"
                />
              </div>
              <div className="col pt-3">
                <h5>Compare with friends!</h5>
                <img
                  className="landing-img"
                  src="../images/balance.png"
                  alt="Share!"
                />
              </div>
            </div>
            <div className="row pt-5">
              <p>
                True Daily Double is here to enhance your daily Jeopardy!
                viewing experience. Simply create an account and log-in to
                create new games, track your scores, and share or compete with
                friends!
              </p>
            </div>
          </div>
          <div className="col-md-5 m-0 p-0 pb-3">
            <img
              className="side-image"
              src="../images/audience.png"
              alt="jeopardy-audience"
            />
          </div>
        </div>
      </div>
      <Tribute />
    </div>
  );
};

export default Description;
