import "./App.css";

import { useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import Login from "./components/Login";
import Signup from "./components/Signup";

export const UserContext = createContext();

function App() {
  const [email, setEmail] = useState("");
  return (
    <UserContext.Provider value={{ email, setEmail }}>
      <Router>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />

          <Route
            path=""
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
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
