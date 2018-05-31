import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";

import "semantic-ui-css/semantic.min.css";
import "./styles/app.css";

const App = () => (
  <div className="ui container">
    <Routes />
  </div>
);

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
