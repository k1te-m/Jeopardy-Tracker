import React from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../auth/authSlice";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const auth = useSelector(selectAuth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user && auth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/welcome",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
