import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { AuthProvider } from "./context/authContext";
import { ImageModalProvider } from "./context/uiContext";

ReactDOM.render(
  <AuthProvider>
    <ImageModalProvider>
      <App />
    </ImageModalProvider>
  </AuthProvider>,
  document.getElementById("root")
);
