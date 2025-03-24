import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App/App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router basename="/To-do-list/">
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </StrictMode>,
);
