import React from "react";

const LogoutButton = ({ logout }) => {
  return (
    <button className="button btn logout" onClick={logout}>
      Log out
    </button>
  );
};

export default LogoutButton;
