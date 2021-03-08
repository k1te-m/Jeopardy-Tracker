import React, { useEffect } from "react";
import LogoutButton from "../logout/LogoutButton";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, LOGOUT, loadUser } from "../auth/authSlice";
import { getGames, selectGames } from "../games/gamesSlice";
import AddNewGame from "../games/addNewGame/AddNewGame";
const Dashboard = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  useEffect(() => {
    if (!auth.user) {
      dispatch(loadUser());
    }
    dispatch(getGames(auth.user._id));
  }, [auth.user, dispatch]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-9">
          <h1>Dashboard</h1>
        </div>
        <div className="col-3">
          <div className="row">
            <LogoutButton logout={() => dispatch(LOGOUT())} />
          </div>
          <span>New Game</span> <AddNewGame />
        </div>
      </div>
      <div className="row"></div>
    </div>
  );
};

export default Dashboard;
