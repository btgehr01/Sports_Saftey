import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth0-provider-with-history";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";

/*
this is where the web application starts, this component warps the App component within a browser router component,
this allows the application to store the current location in the browser's address bar using clean URLs and navigate using the browser's built-in history stack
*/

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <App />
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
