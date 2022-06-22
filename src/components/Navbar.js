import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

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
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit" onClick={navigateLogin}>
            Login
          </Button>
          <Button color="inherit" onClick={navigateSignUp}>
            Signup
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
