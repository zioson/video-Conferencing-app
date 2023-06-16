import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import "@elastic/eui/dist/eui_theme_light.css";
// import "@elastic/eui/dist/eui_theme_dark.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
// import { store } from "./app/store";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
   <Provider store={store}>
   <Router>
    <App />
    </Router>

   </Provider>
 
  </React.StrictMode>,
  document.getElementById("root")
);