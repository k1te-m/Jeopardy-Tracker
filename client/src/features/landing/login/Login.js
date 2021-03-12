import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, loginUser } from "../../auth/authSlice";
import { SET_ALERT } from "../../alert/alertSlice";

const Login = (props) => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
  }, [auth.isAuthenticated, props.history]);

  const [userObject, setUserObject] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userObject;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserObject({ ...userObject, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const mailformat = /.+@.+\..+/;
    if (email === "" || password === "") {
      dispatch(
        SET_ALERT({
          message: "Please enter all available fields.",
          type: "danger",
        })
      );
    } else if (!email.match(mailformat)) {
      dispatch(
        SET_ALERT({
          message: "Please enter a valid email address.",
          type: "danger",
        })
      );
    } else {
      dispatch(loginUser({ email, password }));
    }
  };

  return (
    <>
      <div className="container">
        <h3>Account Log in</h3>
        <form>
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            onChange={handleInputChange}
            name="email"
            placeholder="ksmith@gmail.com"
            type="email"
          />
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            onChange={handleInputChange}
            name="password"
            placeholder="password"
            value={password}
            type="password"
          />
          <button className="btn btn-success mt-2" onClick={handleFormSubmit}>
            Log in
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
