import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, loadUser } from "../auth/authSlice";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Description from "./description/Description";

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
      <Description />
      <Footer />
    </>
  );
};

/*
Attributions for images: 
lamp.png - Pixel perfect https://www.flaticon.com/authors/pixel-perfect
debt.png - Freepik https://www.flaticon.com/authors/freepik
balance.png - monkik https://www.flaticon.com/authors/monkik
Jeopardy! Audience - https://www.jeopardy.com/sites/default/files/social_meta/audience.jpg
*/

export default Landing;
