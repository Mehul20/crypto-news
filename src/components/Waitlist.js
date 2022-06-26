import * as React from "react";
import { useState, createContext, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { db } from "../firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Waitlist() {
  const [waitlistEmail, setWailistEmail] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const joinWaitlist = async () => {
    console.log(waitlistEmail);
    console.log(user);
    await setDoc(doc(db, "waitlist", waitlistEmail), {
      Email: waitlistEmail,
      Name: user,
    });
    navigate("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box component="form" noValidate sx={{ mt: 1 }}>
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
              setUser(event.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
            onChange={(event) => {
              setWailistEmail(event.target.value);
            }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              background: "#b79ced",
              "&:hover": {
                backgroundColor: "#9f81db",
              },
            }}
            onClick={joinWaitlist}
          >
            Join!
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}