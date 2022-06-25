import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css"
import { green } from "@mui/material/colors";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const navigateLogin = () => {
    // 👇️ navigate to /
    navigate("/login");
  };

  const navigateSignUp = () => {
    // 👇️ navigate to /
    navigate("/signup");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="buttonright">
          <Button color="inherit" onClick={navigateLogin} align="right">
            Login
          </Button>
          <Button color="inherit" onClick={navigateSignUp} align="right">
            Signup
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
