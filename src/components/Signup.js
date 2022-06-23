// import React from "react";
// import { useState, useContext } from "react";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
// } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../firebase-config";
// import { db } from "../firebase-config";
// import { doc, setDoc } from "firebase/firestore";
// import { UserContext } from "../App";

// function Signup() {
//   const [registerEmail, setRegisterEmail] = useState("");
//   const [registerFullName, setRegisterFullName] = useState("");
//   const [registerPassword, setRegisterPassword] = useState("");
//   const { email, setEmail } = useContext(UserContext);
//   const navigate = useNavigate();
//   // const { profileType, setProfileType } = useContext(ProfileContext);

//   const register = async () => {
//     try {
//       const user = await createUserWithEmailAndPassword(
//         auth,
//         registerEmail,
//         registerPassword
//       );
//       console.log(user);
//       await setDoc(doc(db, "users", registerEmail), {
//         Email: registerEmail,
//         Name: registerFullName,
//         Upvotes: null,
//       });

//       navigate("/homeWithLogIn");
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   return (
//     <div>
//       <div>
//         <h3> Register User </h3>
//         <input
//           placeholder="Full Name"
//           onChange={(event) => {
//             setRegisterFullName(event.target.value);
//           }}
//         ></input>
//         <input
//           placeholder="Email..."
//           onChange={(event) => {
//             setRegisterEmail(event.target.value);
//             setEmail(event.target.value);
//           }}
//         />
//         <input
//           placeholder="Password..."
//           type="password"
//           onChange={(event) => {
//             setRegisterPassword(event.target.value);
//           }}
//         />
//         <div></div>

//         <button onClick={register}> Create User</button>
//       </div>
//     </div>
//   );
// }

// export default Signup;

import * as React from "react";
import { useState, createContext, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
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
import { UserContext } from "../App";

const theme = createTheme();

export default function Signup() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerFullName, setRegisterFullName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const { email, setEmail } = useContext(UserContext);
  const navigate = useNavigate();

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

      navigate("/homeWithLogIn");
    } catch (error) {
      console.log(error.message);
    }
  };

  const goToLogin = () => {
    console.log("in signup");
    navigate("/login");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={register}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, ml: 1.5 }}
                  onClick={goToLogin}
                >
                  Already have an account? Sign in here
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
