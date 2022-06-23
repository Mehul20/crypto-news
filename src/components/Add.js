import * as React from "react";
import { useState, createContext, useContext } from "react";
import { doc, setDoc, query, getDocs, collection } from "firebase/firestore";
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
import { UserContext } from "../App";
import Multiselect from "multiselect-react-dropdown";
import { yellow } from "@mui/material/colors";

const theme = createTheme();

export default function Add() {
  const [registerName, setName] = useState("");
  const { email, setEmail } = useContext(UserContext);
  const [flag, setFlag] = useState(false);

  const [registerLinking, setLink] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const multiselectRef = React.createRef();
  const [options, setOptions] = useState([
    { name: "Defi" },
    { name: "DAO" },
    { name: "NFT" },
    { name: "Bitcoin" },
    { name: "Conferences" },
    { name: "Cryptocurrencies" },
    { name: "Ethereum" },
    { name: "Layer 2" },
    { name: "Web3 Dev" },
    { name: "Web3 Educational Resources" },
    { name: "Web3 VC" },
    { name: "Trading" },
    { name: "Smart Contracts" },
    { name: "Stablecoins" },
  ]);
  const navigate = useNavigate();
  let temp = false;

  const duplicateCheck = async function () {
    const q = query(collection(db, "table"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data().Link == registerLinking) {
        console.log(doc.data().Link);
        console.log(registerLinking);

        return true;
      }
    });
    return false;
  };

  const register = async () => {
    if (duplicateCheck()) {
      alert("Duplicate article being added. Please check your link");
    } else {
      try {
        const items = multiselectRef.current.getSelectedItems();
        let tempTags = [];
        items.forEach(function (item) {
          console.log(item.name);
          tempTags.push(item.name);
        });

        await setDoc(doc(db, "table", registerName), {
          Name: registerName,
          Link: registerLinking,
          Description: tempTags,
          Upvotes: 0,
        });
        navigate("/homeWithLogIn");
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const onSelect = (selectedList, selectedItem) => {
    console.log("onselect");
    const items = multiselectRef.current.getSelectedItems();
    console.log(items);
  };

  const onRemove = (selectedList, removedItem) => {
    console.log("onremove");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };
  const style = {
    chips: {
      background: "light-blue",
    },
    searchBox: {
      // "border-radius": "25px",
      height: "50px",
      margin: "10px",
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      paddingBottom: 0,
      marginTop: 10,
    },
    multiselectContainer: {
      color: "black",
    },
  };

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
          <Typography component="h1" variant="h5">
            Add Article
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 4 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="ArticleName"
              label="Article Name"
              name="ArticleName"
              autoComplete="ArticleName"
              autoFocus
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Link"
              label="Link"
              name="Link"
              autoComplete="Link"
              autoFocus
              onChange={(event) => {
                setLink(event.target.value);
              }}
            />
            <Multiselect
              options={options} // Options to display in the dropdown
              onSelect={onSelect} // Function will trigger on select event
              onRemove={onRemove} // Function will trigger on remove event
              displayValue="name"
              ref={multiselectRef}
              // Property name to display in the dropdown options
              style={style}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={register}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
