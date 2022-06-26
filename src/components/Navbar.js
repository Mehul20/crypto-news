import * as React from "react";
import { useState, useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { green } from "@mui/material/colors";
import { UserContext, LoggedInEmailContext } from "../App";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const { email, setEmail } = useContext(UserContext);
  const { loggedInEmail, setLoggedInEmail } = useContext(LoggedInEmailContext);
  const [name, setName] = useState("");
  const navigateLogin = () => {
    // 👇️ navigate to /
    navigate("/login");
  };

  const navigateSignUp = () => {
    // 👇️ navigate to /
    navigate("/signup");
  };

  useEffect(() => {
    if (loggedInEmail != "") {
      getName();
    }
  }, []);

  async function getName() {
    const docRef = doc(db, "users", loggedInEmail);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setName(docSnap.data().Name);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#b79ced" }}>

        <Toolbar className="buttonright">
          {name != "" ? (
            <div>
              Hi, {name}!{console.log(loggedInEmail)}
            </div>
          ) : (
            <div>
              <Button color="inherit" onClick={navigateLogin} align="right">
                Login
              </Button>
              <Button color="inherit" onClick={navigateSignUp} align="right">
                Signup
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
