import * as React from "react";
import { useState, useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";
import { UserContext, LoggedInEmailContext } from "../App";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import "../styles/navbar.css";

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
      <AppBar position="static" style={{ background: "#000" }}>
        <Toolbar>
          <Typography
            align="left"
            variant="h4"
            fontWeight="bold"
            component="div"
            sx={{ flexGrow: 1 }}
            className="typogra"
          >
            Converge
          </Typography>
          <div>
            <Button
              onClick={navigateLogin}
              align="right"
              style={{
                backgroundColor: "#5E5DEF",
                borderRadius: "15px",
                marginRight: "20px",
              }}
            >
              <span
                style={{
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                {" "}
                Login{" "}
              </span>
            </Button>
            <Button
              onClick={navigateSignUp}
              align="right"
              style={{
                backgroundColor: "#5E5DEF",
                borderRadius: "15px",
              }}
            >
              <span
                style={{
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                {" "}
                Sign up{" "}
              </span>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
