import * as React from "react";
import { useState, createContext, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { db } from "../firebase-config";
import { UserContext, LoggedInEmailContext } from "../App";
import "../styles/login.css";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Login() {
  const { email, setEmail } = useContext(UserContext);
  const { loggedInEmail, setLoggedInEmail } = useContext(LoggedInEmailContext);
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, loginPassword);
      navigate("/table");
      console.log(loggedInEmail);
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const goToSignup = () => {
    console.log("in signup");
    navigate("/signup");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  React.useEffect(() => {
    localStorage.setItem("logged-In-Email", loggedInEmail);
  }, [loggedInEmail]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 17,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#5e5def" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography sx={{ color: "white" }} component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => {
                setEmail(event.target.value);
                setLoggedInEmail(event.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => {
                setLoginPassword(event.target.value);
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                background: "#5E5DEF",
                "&:hover": {
                  backgroundColor: "#2423e8",
                },
              }}
              onClick={login}
            >
              Sign In
            </Button>
            <Grid container>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  background: "#5E5DEF",
                  "&:hover": {
                    backgroundColor: "#2423e8",
                  },
                }}
                onClick={goToSignup}
              >
                Don't have an account? Sign up here!
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
