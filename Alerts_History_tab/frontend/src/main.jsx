import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, initializeIcons } from "@fluentui/react";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";
import "./global.css";

initializeIcons();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>
);
