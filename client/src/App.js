import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./features/routing/PrivateRoute";
import Dashboard from "./features/dashboard/Dashboard";
import Landing from "./features/landing/Landing";
import Login from "./features/landing/login/Login";
import SignUp from "./features/landing/signup/Signup";
import Game from "./features/games/game/Game";
import setAuthToken from "./utils/setAuthToken";
import Alert from "./features/alert/Alert";
import Profile from "./features/profile/Profile";
import "./sass/main.scss";
import Highscores from "./features/highscores/Highscores";

function App() {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  return (
    <div className="App">
      <Router>
        <Alert />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/highscores" component={Highscores} />
          <PrivateRoute exact path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/profile/:username" component={Profile} />
          <PrivateRoute path="/:game" component={Game} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
