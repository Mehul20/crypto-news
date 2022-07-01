import "./App.css";

import { useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Add from "./components/Add";
import TableWithoutLogin from "./components/TableWithouLogin";
import NavbarWithoutLogin from "./components/NavbarWithoutLogin";

export const UserContext = createContext();
export const LoggedInEmailContext = createContext();

function App() {
  const [email, setEmail] = useState("");
  const [loggedInEmail, setLoggedInEmail] = useState(
    // localStorage.getItem("logged-In-Email") === ""
    localStorage.getItem("logged-In-Email")
  );
  // const saved = localStorage.getItem("logged-In-Email");
  return (
    <UserContext.Provider value={{ email, setEmail }}>
      <LoggedInEmailContext.Provider
        value={{ loggedInEmail, setLoggedInEmail }}
      >
        <Router>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="add" element={<Add />} />
            <Route
              path=""
              element={
                <div className="App">
                  <div className="navbar">
                    <NavbarWithoutLogin />
                  </div>
                  <div className="news-table-withoutlogin">
                    <TableWithoutLogin />
                  </div>
                </div>
              }
            />
            <Route
              path="homeWithLogIn"
              element={
                <div className="App">
                  <div className="navbar">
                    <Navbar />
                  </div>
                  <div className="news-table">
                    <Table />
                  </div>
                </div>
              }
            />
            <Route
              path="table"
              element={
                <div className="App">
                  <div className="navbar">
                    <Navbar />
                  </div>
                  <div>
                    {loggedInEmail != "" ? (
                      <div className="news-table">
                        <Table />
                      </div>
                    ) : (
                      <div className="news-table-withoutlogin">
                        <TableWithoutLogin />
                      </div>
                    )}
                  </div>
                </div>
              }
            />
          </Routes>
        </Router>
      </LoggedInEmailContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
