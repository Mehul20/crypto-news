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
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { UserContext, LoggedInEmailContext } from "../App";
import "../styles/signup.css";
const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Signup() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerFullName, setRegisterFullName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const { email, setEmail } = useContext(UserContext);
  const { loggedInEmail, setLoggedInEmail } = useContext(LoggedInEmailContext);
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const checkcode = () => {
    console.log(code);
    if (code === "converge1") {
      console.log(code);
      register();
    } else {
      alert("Sorry, Waitlist code doesn't match!");
    }
  };
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
      await setDoc(doc(db, "users", registerEmail), {
        Email: registerEmail,
        Name: registerFullName,
        Upvotes: null,
      });

      navigate("/table");
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const goToLogin = () => {
    console.log("in signup");
    navigate("/login");
  };

  const goToWaitlist = () => {
    console.log("in waitlist");
    navigate("/");
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
          <Avatar sx={{ m: 1, bgcolor: "#5E5DEF" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography sx={{ color: "white" }} component="h1" variant="h5">
            Sign up
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
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={(event) => {
                setRegisterFullName(event.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => {
                setRegisterEmail(event.target.value);
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
                setRegisterPassword(event.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Waitlistcode"
              label="Waitlistcode"
              type="waitlistcode"
              id="waitlist Code"
              onChange={(event) => {
                setCode(event.target.value);
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
              onClick={checkcode}
            >
              Sign Up
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
                onClick={goToLogin}
              >
                Already have an account? Sign in here
              </Button>
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
                onClick={goToWaitlist}
              >
                Don't have a code? Join the waitlist
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
