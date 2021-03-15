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

  return (
    <div className="container-fluid">
      <div className="header">
        <div className="row">
          <div className="col">
            <Link to="/" className="navBrand my-auto">
              True Daily Double
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
    </div>
  );
};

export default Header;
