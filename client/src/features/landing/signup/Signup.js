import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, registerUser } from "../../auth/authSlice";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";

const SignUp = (props) => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
  }, [auth.error, auth.isAuthenticated, props.history]);

  // State object for user name, username, email, and password confirmation
  const [userObject, setUserObject] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, username, email, password, password2 } = userObject;

  // Handles input changes for all form fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserObject({ ...userObject, [name]: value });
  };

  /* Handles form submit for user sign-up. Checks that all 
     available fields have been entered, that email is in valid
     format and that both password fields match. If all criteria is met
     dispatch(registerUser) is called. User email is checked against db
     and if not already registered, user will be registered and logged in.
     Any error will be sent as an alert to the user.
  */
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const mailformat = /.+@.+\..+/;
    if (name === "" || email === "" || password === "") {
      alert("Please enter all available fields.");
    } else if (!email.match(mailformat)) {
      dispatch(alert("Please enter a valid email address."));
    } else if (password !== password2) {
      alert("Passwords do not match.");
    } else {
      dispatch(registerUser({ name, username, email, password }));
      if (typeof auth.error === "string") {
        alert(auth.error);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container signup-container">
        <div className="row pt-3">
          <h3>Create account</h3>
        </div>
        <div className="row">
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                onChange={handleInputChange}
                className="form-control"
                name="name"
                placeholder="Kelly Smith"
                type="text"
              />
              <label htmlFor="username">Username</label>
              <input
                onChange={handleInputChange}
                className="form-control"
                name="username"
                placeholder="ksmithdev"
                type="text"
              />
              <label htmlFor="email">Email</label>
              <input
                onChange={handleInputChange}
                className="form-control"
                name="email"
                placeholder="ksmith@gmail.com"
                type="email"
              />
              <label htmlFor="password">Password</label>
              <input
                onChange={handleInputChange}
                className="form-control"
                name="password"
                placeholder="Password"
                type="password"
              />
              <label htmlFor="password2">Confirm Password</label>
              <input
                onChange={handleInputChange}
                className="form-control"
                name="password2"
                placeholder="Confirm Password"
                type="password"
              />
            </div>
            <button
              className="button btn mt-2 purpbtn"
              onClick={handleFormSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
