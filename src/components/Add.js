import React from "react";
import {
  doc,
  setDoc,
  query,
  getDocs,
  collection,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { UserContext, LoggedInEmailContext } from "../App";
import Multiselect from "multiselect-react-dropdown";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Add() {
  const [registerName, setName] = useState("");
  const { email, setEmail } = useContext(UserContext);
  const { loggedInEmail, setLoggedInEmail } = useContext(LoggedInEmailContext);
  const [flag, setFlag] = useState(false);
  const [registerLinking, setLink] = useState("");
  const [source, setSource] = useState("");
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
  const theme = createTheme();

  const register = async () => {
    const q = query(collection(db, "table"));
    const querySnapshot = await getDocs(q);
    let c = 0;
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.data().Link)
      if (doc.data().Link === registerLinking) {
        c = c + 1;
      }
    });
    console.log(c);
    if (c >= 1) {
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
          Source: source,
          Description: tempTags,
          Upvotes: 0,
        });
        saveArticle();
        navigate("/table");
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  const saveArticle = async () => {
    await updateDoc(doc(db, "users", loggedInEmail), {
      Articles: arrayUnion(registerName),
    });
  };

  const onSelect = (selectedList, selectedItem) => {
    console.log("onselect");
    const items = multiselectRef.current.getSelectedItems();
    console.log(items);
  };

  const onRemove = (selectedList, removedItem) => {
    console.log("onremove");
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

  useEffect(() => {
    localStorage.setItem("logged-In-Email", loggedInEmail);
  }, []);

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
              inputProps={{ maxLength: 120 }}
              autoComplete="ArticleName"
              autoFocus
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <TextField
              margin="normal"
              required={true}
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
            <TextField
              margin="normal"
              required={true}
              fullWidth
              id="Source"
              label="Source"
              name="Source"
              autoComplete="Source"
              autoFocus
              onChange={(event) => {
                setSource(event.target.value);
              }}
            />
            <Multiselect
              options={options} // Options to display in the dropdown
              onSelect={onSelect} // Function will trigger on select event
              onRemove={onRemove} // Function will trigger on remove event
              displayValue="name"
              ref={multiselectRef}
              selectionLimit={1}
              // Property name to display in the dropdown options
              style={style}
            />
            <Button
              type="submit"
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

export default Add;
