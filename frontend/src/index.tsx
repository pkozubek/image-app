import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { AuthProvider } from "./context/auth-context";
import { ImageModalProvider } from "./context/image-modal-context";

ReactDOM.render(
  <AuthProvider>
    <ImageModalProvider>
      <App />
    </ImageModalProvider>
  </AuthProvider>,
  document.getElementById("root")
);
