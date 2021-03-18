import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, loadUser } from "../auth/authSlice";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";

const Landing = (props) => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
    if (!auth.user) {
      dispatch(loadUser());
    }
  }, [auth.isAuthenticated, auth.user, props.history, dispatch]);
  return (
    <>
      <Header />
      <div className="container landing">
        <div className="row">
          <div className="col-md-7">
            <div className="row">
              <h1>Welcome to True Daily Double!</h1>
            </div>
            <div className="row">
              <div className="col">
                <h5>Watch Jeopardy!</h5>
                <img className="landing-img" src="../images/lamp.png" />
              </div>
              <div className="col">
                <h5>Track scores...</h5>
                <img className="landing-img" src="../images/debt.png" />
              </div>
              <div className="col pt-3">
                <h5>Compare with friends!</h5>
                <img className="landing-img" src="../images/balance.png" />
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
          <div className="col-md-5">
            <img className="side-image" src="../images/audience.png" />
          </div>
        </div>

        {/* <div className="row header">
          <div className="col">
            <Link to="/signup">
              <button className="button btn">Signup</button>
            </Link>
          </div>
          <div className="col">
            <Link to="/login">
              <button className="button btn">Login</button>
            </Link>
          </div>
        </div> */}
        {/* <div className="row main">
          <div className="col-6">
            <h1>Welcome to True Daily Double!</h1>
          </div>
        </div>
        <div className="row subtext">
          <div className="col-4">
            <div className="row">
              <h5>Watch Jeopardy!</h5>
            </div>
            <div className="row">
              <img className="landing-img" src="../images/lamp.png" />
            </div>
          </div>
          <div className="col-4">
            <div className="row">
              <h5>Track your scores...</h5>
            </div>
            <div className="row">
              <img className="landing-img" src="../images/debt.png" />
            </div>
          </div>
          <div className="col-4">
            <div className="row">
              <h5>Compare with friends!</h5>
            </div>
            <div className="row">
              <img className="landing-img" src="../images/balance.png" />
            </div>
          </div>
        </div> */}
      </div>
      <Footer />
    </>
  );
};

/*
All images courtesy of FlatIcon.com
Attributions for images: 
lamp.png - Pixel perfect https://www.flaticon.com/authors/pixel-perfect
debt.png - Freepik https://www.flaticon.com/authors/freepik
balance.png - monkik https://www.flaticon.com/authors/monkik
*/

export default Landing;
