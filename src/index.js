import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./custom.css";
import "./css/components/public.css"
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Menucontext from "./context/Menucontext";
import Contextwidth from "./context/Windowsize";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Contextwidth>
    <Menucontext>
      <Router>
        <App />
      </Router>
    </Menucontext>
  </Contextwidth>
);
