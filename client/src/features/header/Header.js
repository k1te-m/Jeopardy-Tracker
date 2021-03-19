import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../logout/LogoutButton";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../auth/authSlice";
import { LOGOUT } from "../auth/authSlice";
import { useHistory } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector(selectAuth);

  if (auth.isAuthenticated) {
    return (
      <div className="container-fluid header">
        <div className="row">
          <div className="col">
            <Link to="/" className="navBrand my-auto">
              <img src="../images/tdd.png" alt="True Daily Double" />
            </Link>
          </div>
          <div className="col">
            <div className="row">
              <button
                className="button"
                onClick={() => {
                  history.push(`/profile/${auth.user.username}`);
                }}
              >
                Profile
              </button>
            </div>
            <div className="row">
              <LogoutButton logout={() => dispatch(LOGOUT())} />
            </div>
          </div>
        </div>
      </div>
    );
  } else if (!auth.isAuthenticated) {
    return (
      <div className="container-fluid header">
        <div className="row">
          <div className="col-3">
            <Link to="/" className="navBrand my-auto">
              <img src="../images/tdd.png" alt="True Daily Double" />
            </Link>
          </div>
          <div className="col-9 pt-3">
            <div className="row">
              <Link to="/signup">
                <button className="button btn">Signup</button>
              </Link>
            </div>
            <div className="row">
              <Link to="/login">
                <button className="button btn">Login</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Header;
