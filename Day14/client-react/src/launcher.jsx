import { Link, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import logo from "./Logo.png";
import Home from "./home";
import About from "./about ";
import Dashboard from "./Dashboard";
import SignIn from "./signin";
import ProtectedRoute from "./protectedRoute";

function Launcher() {
  return (
    <>
      <div className="container text-center">
        <img
          src={logo}
          alt="company-logo-image"
          className="img-fluid"
          style={{ width: "100px", height: "100px" }}
        />
        <hr />
        <Link to={"/home"}>Home</Link> {"  |  "}
        <Link to={"/about"}>About</Link> {"  |  "}
        <Link to={"/dashboard"}>Dashboard</Link> {"  |  "}
        <Link to={"/signin"}>Sign In</Link> {"  |  "}
        <hr />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="*" element={<h1>Unknown resource!</h1>}></Route>
        </Routes>
      </div>
    </>
  );
}

export default Launcher;
