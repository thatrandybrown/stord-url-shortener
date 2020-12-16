import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import ShortLink from "./components/ShortLink";

import "./App.css";

const App = () => {
  return (
    <>
      <header>
        <h1>STORD.AS</h1>
      </header>
      <main>
        <ErrorBoundary>
          <Router>
            <Switch>
              <Route exact path="/" children={<Home />} />
              <Route exact path="/:id" children={<ShortLink />} />
              <Route path="*" children={<NotFound />} />
            </Switch>
          </Router>
        </ErrorBoundary>
      </main>
      <footer>
        <p>&copy; 2020</p>
        <p>
          Shipping container by Creaticca Creative Agency from the Noun Project
        </p>
      </footer>
    </>
  );
};

export default App;
