import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { green } from "@mui/material/colors";
import Multiselect from "multiselect-react-dropdown";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../styles/table.css";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Button from "@mui/material/Button";

import {
  doc,
  getDocs,
  collection,
  increment,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { UserContext, LoggedInEmailContext } from "../App";

function createData(name, linking, source, link, desc) {
  return { name, linking, source, link, desc };
}

export default function BasicTable() {
  const { email, setEmail } = useContext(UserContext);
  const { loggedInEmail, setLoggedInEmail } = useContext(LoggedInEmailContext);
  const [rows, setRows] = useState([]);

  const multiselectRef = React.createRef();
  const [tagged, setTagged] = useState(false);

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

  useEffect(() => {
    loop();
    rendering();
    localStorage.setItem("logged-In-Email", loggedInEmail);
  }, []);

  const [upvotesData, setUpvotesData] = useState([]);

  async function rendering() {
    const docRef = doc(db, "users", loggedInEmail);
    const docSnap = await getDoc(docRef);
    setUpvotesData(docSnap.data().Upvotes);
  }

  let temp = [];

  async function loop() {
    const querySnapshot = await getDocs(collection(db, "table"));
    querySnapshot.forEach((doc) => {
      temp.push(
        createData(
          doc.data().Name,
          doc.data().Link,
          doc.data().Source,
          doc.data().Upvotes,
          doc.data().Description
        )
      );
    });
    temp.sort((a, b) => {
      return b.link - a.link;
    });
    setRows(temp);
    temp = [];
  }

  async function tagLoop(items) {
    const querySnapshot = await getDocs(collection(db, "table"));
    querySnapshot.forEach((doc) => {
      if (doc.data().Description.includes(items[0].name)) {
        temp.push(
          createData(
            doc.data().Name,
            doc.data().Link,
            doc.data().Source,
            doc.data().Upvotes,
            doc.data().Description
          )
        );
      }
    });
    temp.sort((a, b) => {
      return b.link - a.link;
    });

    setRows(temp);
    temp = [];
  }

  const upvoteHandler = async (nameOfArticle) => {
    // const docRef = doc(db, "users", email);
    const docRef = doc(db, "users", loggedInEmail);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data().Upvotes;
    if (data == null || !data.includes(nameOfArticle)) {
      await updateDoc(doc(db, "users", loggedInEmail), {
        Upvotes: arrayUnion(nameOfArticle),
      });
      await updateDoc(doc(db, "table", nameOfArticle), {
        Upvotes: increment(1),
      });
      loop();
      rendering();
      console.log(email);
    } else {
      console.log("exists");
    }
  };

  const navigate = useNavigate();
  const theme = createTheme();

  const onSelect = () => {
    const items = multiselectRef.current.getSelectedItems();
    console.log(items);
    tagLoop(items);
  };
  const onRemove = () => {
    const items = multiselectRef.current.getSelectedItems();
    console.log(items);
    loop();
  };

  const gotoAdd = async () => {
    try {
      console.log("Added");
      navigate("/add");
    } catch (error) {
      console.log(error.message);
    }
  };

  const style = {
    chips: {
      background: "#b79ced",
    },
    option: {
      color: "black",
    },

    searchBox: {
      // "border-radius": "25px",
      height: "40px",
      margin: "10px",
      width: "100%",
      marginLeft: "auto",
      marginRight: 20,
      paddingBottom: 0,
      marginTop: 10,
      marginBottom: 20,
      backgroundColor: "white",
    },
    multiselectContainer: {
      color: "black",
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div className="tableheader">
          <div className="buttondiv">
            <Button
              onClick={gotoAdd}
              type="submit"
              variant="outlined"
              className="buttonstyle"
              style={{
                backgroundColor: "#5E5DEF",
                borderRadius: "15px",
              }}
            >
              {" "}
               <span
                style={{
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                {" "}
                Add a resource{" "}
              </span>

            </Button>
          </div>

          <Multiselect
            options={options} // Options to display in the dropdown
            onSelect={onSelect} // Function will trigger on select event
            onRemove={onRemove} // Function will trigger on remove event
            displayValue="name"
            selectionLimit={1}
            ref={multiselectRef}
            placeholder="Search for Tags"
            // Property name to display in the dropdown options
            style={style}
          />
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead className="tableheaddesign">
              <TableRow>
                <TableCell style={{ width: "40%" }} className="header">
                  <div className="header"> Article Name </div>
                </TableCell>
                <TableCell style={{ width: "25%" }} className="header">
                  <div className="header"> Source </div>
                </TableCell>
                <TableCell
                  style={{ width: "15%" }}
                  align="left"
                  className="header"
                >
                  <div className="header"> Tags </div>
                </TableCell>
                <TableCell
                  style={{ width: "10%" }}
                  align="left"
                  className="header"
                >
                  <div className="header"> Upvotes </div>
                </TableCell>
                <TableCell
                  style={{ width: "10%" }}
                  align="left"
                  className="header"
                >
                  <div className="header"> Link </div>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <a href={row.linking} target="_blank" className="text">
                      {row.name}
                    </a>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <a href={row.linking} target="_blank" className="text">
                      {row.source}
                    </a>
                  </TableCell>

                  <TableCell align="left">
                    {row.desc.map((data, index) => {
                      return (
                        <Chip
                          label={data}
                          variant="outlined"
                          style={{
                            backgroundColor: "#b79ced",
                            color: "#fff",
                            fontWeight: "bold",
                            fontFamily: "Alice', serif",
                          }}
                          size="large"
                        />
                      );
                    })}
                  </TableCell>

                  <TableCell align="left">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "large",
                        }}
                      >
                        {row.link}
                      </span>
                      <div>
                        {upvotesData != null &&
                        upvotesData.includes(row.name) ? (
                          <ArrowCircleUpIcon style={{ color: green[500] }} />
                        ) : (
                          <ArrowCircleUpIcon
                            onClick={() => {
                              upvoteHandler(row.name);
                            }}
                            sx={{ "&:hover": { color: green[500] } }}
                          />
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <a href={row.linking} className="icon">
                      {" "}
                      <OpenInNewIcon> </OpenInNewIcon>{" "}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </ThemeProvider>
  );
}
