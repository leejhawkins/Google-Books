import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import ReadingList from "./pages/ReadingList"
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Books} />
          <Route exact path="/reading-list" component={ReadingList} />
          <Route exact path="/books" component={Books} />
          <Route exact path="/books/:id" component={Detail} />

          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </div>

    </Router>
  );
}

export default App;
