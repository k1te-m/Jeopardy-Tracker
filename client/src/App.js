import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./features/routing/PrivateRoute";
import Dashboard from "./features/dashboard/Dashboard";
import Landing from "./features/landing/Landing";
import Login from "./features/landing/login/Login";
import SignUp from "./features/landing/signup/Signup";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute exact path="/">
            <Dashboard />
          </PrivateRoute>
          <Route path="/welcome" component={Landing} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
