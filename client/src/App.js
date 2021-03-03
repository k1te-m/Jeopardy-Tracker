import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <p>Hello World</p>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
