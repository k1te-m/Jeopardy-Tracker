import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, loadUser } from "../auth/authSlice";
import "../../sass/main.scss";
import { Link } from "react-router-dom";

const Landing = (props) => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isAuthenticated) {
      props.history.push("/");
    }
    if (!auth.user) {
      dispatch(loadUser());
    }
  }, [auth.isAuthenticated, auth.user, props.history, dispatch]);
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
