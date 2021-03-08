import React from "react";
import LogoutButton from "../logout/LogoutButton";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, LOGOUT, loadUser } from "../auth/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  return (
    <div className="container">
      <div className="row">
        <div className="col-9">
          <h1>Dashboard</h1>
        </div>
        <div className="col-3">
          <LogoutButton logout={() => dispatch(LOGOUT())} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
