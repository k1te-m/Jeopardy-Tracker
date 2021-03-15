import React from "react";

const LogoutButton = ({ logout }) => {
  return (
    <button className="button" onClick={logout}>
      Log out
    </button>
  );
};

export default LogoutButton;
