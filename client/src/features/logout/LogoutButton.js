import React from "react";

const LogoutButton = ({ logout }) => {
  return (
    <button className="button btn purpbtn" onClick={logout}>
      Log out
    </button>
  );
};

export default LogoutButton;
