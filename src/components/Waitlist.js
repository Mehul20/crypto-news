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
import "../styles/table.css";

const theme = createTheme();

export default function Waitlist() {
  const [waitlistEmail, setWailistEmail] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [flag, setflag] = useState(false);

  const joinWaitlist = async () => {
    console.log(waitlistEmail);
    console.log(user);
    await setDoc(doc(db, "waitlist", waitlistEmail), {
      Email: waitlistEmail,
      Name: user,
    });
    setflag(true);
    navigate("");
  };

  return (
    <ThemeProvider theme={theme}>
        { !flag ? (
          <div> 
        <div style={{ marginTop: "20px"}}>
        <h1 className="gradient-text">  <span className="exploreAndCurate"> Join the waitlist </span> <br />    to explore more resources!</h1>
        </div>
      <Container component="main" maxWidth="xs">
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            variant="filled"
            name="name"
            autoComplete="name"
            autoFocus
            sx ={{
              backgroundColor:"#ffffff",
            }}
            onChange={(event) => {
              setUser(event.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            variant="filled"
            label="Email"
            type="email"
            id="email"
            sx ={{
              backgroundColor:"#ffffff",
            }}
            onChange={(event) => {
              setWailistEmail(event.target.value);
            }}
          />
          <Button onClick={joinWaitlist}
            style={{
              backgroundColor: "#5E5DEF",
              borderRadius: "15px",
              marginBottom: "20px",
              marginTop: "20px",
            }}> 
              <span style={{
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
               
              }}> Join Now </span>
            </Button>
        </Box>
      </Container>
      </div>
      ) : <div style={{ marginTop: "30px" }}>
      <h1 className="gradient-text">Thanks for joining!</h1>
    </div>
      }
    </ThemeProvider>
  );
}
