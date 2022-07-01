import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../styles/table.css";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { UserContext } from "../App";
import { getDocs, collection, getDoc } from "firebase/firestore";
import "../styles/table.css";
import Waitlist from "./Waitlist";

function createData(name, linking, source, link, desc) {
  return { name, linking, source, link, desc };
}

export default function BasicTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    loop();
  }, []);

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
    temp = temp.slice(0, 6);
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

  const navigate = useNavigate();
  const theme = createTheme();

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
    },
    multiselectContainer: {
      color: "black",
    },
  };

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // hide last border
  }));

  return (
    <ThemeProvider theme={theme}>
      <div>
        <h1 className="exploreAndCurate">
          Explore <span className="gradient-text"> curated </span>
          <br /> Web3 news & resources
          <br /> on <span className="gradient-text"> Converge </span>
        </h1>
        <Button
          style={{
            backgroundColor: "#5E5DEF",
            borderRadius: "15px",
            marginBottom: "20px",
          }}
          href="#waitlistsection"
        >
          <span
            style={{
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {" "}
            Join the Waitlist{" "}
          </span>
        </Button>

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
                <StyledTableRow
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
                        <ArrowCircleUpIcon />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <a href={row.linking} target="_blank" className="icon">
                      {" "}
                      <OpenInNewIcon> </OpenInNewIcon>{" "}
                    </a>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div id="waitlistsection">
          <Waitlist />
        </div>
      </div>
    </ThemeProvider>
  );
}
