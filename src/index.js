import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "components/App";
import { GlobalStyle } from "components/baseStyles/GlobalStyle";


ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <BrowserRouter basename="stroke-doctors-office">
      <GlobalStyle />
      <App />
    </BrowserRouter>
  // </React.StrictMode>
);
