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
        <div className="row w-100">
          <div className="col-3">
            <Link to="/" className="navBrand my-auto">
              <img src="../images/tdd.png" alt="True Daily Double" />
            </Link>
          </div>
          <div className="col-9 my-auto p-0">
            <ul>
              <li>
                <Link>
                  <button
                    className="button btn profile"
                    onClick={() => {
                      history.push(`/profile/${auth.user.username}`);
                    }}
                  >
                    Profile
                  </button>
                </Link>
              </li>
              <li>
                <Link>
                  <LogoutButton logout={() => dispatch(LOGOUT())} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else if (!auth.isAuthenticated) {
    return (
      <div className="container-fluid header">
        <div className="row w-100">
          <div className="col-3">
            <Link to="/" className="navBrand my-auto">
              <img src="../images/tdd.png" alt="True Daily Double" />
            </Link>
          </div>
          <div className="col-9 my-auto p-0">
            <ul>
              <li>
                <Link to="/signup">
                  <button className="button btn signup">Signup</button>
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <button className="button btn login">Login</button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
};

export default Header;
