import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import ReactGA from "react-ga";
import HttpsRedirect from "react-https-redirect";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";

ReactGA.initialize("UA-11756963-5");
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
  return (
    <HttpsRedirect>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </HttpsRedirect>
  );
}

export default App;
