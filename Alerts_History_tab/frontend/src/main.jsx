import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, initializeIcons } from "@fluentui/react";
import App from "./App";
import "./global.css";

initializeIcons();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
