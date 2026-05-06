import { createRoot } from "react-dom/client";
import Dashboard from "./Dashboard.jsx";
import SignIn from "./signin.jsx";
import Launcher from "./launcher.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Launcher />
  </BrowserRouter>,
);
