import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { db } from "../firebase-config";
import {getDocs, collection} from "firebase/firestore";
import { useEffect } from "react";


function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [];
async function loop() {
  const querySnapshot = await getDocs(collection(db, "table"));
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.data());
      console.log(doc.data().Name);
      console.log(doc.data().Description[0]);
      rows.push(createData(doc.data().Name,doc.data().Link,doc.data().Description[0]));
    });
  }

  function printRow() {
    console.log(rows)
  }

export default function BasicTable() {
  useEffect(() => {
  loop();
  printRow()
  },[])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "50%" }}>Article Name</TableCell>
            <TableCell style={{ width: "15%" }} align="center">
              Upvotes
            </TableCell>
            <TableCell style={{ width: "35%" }} align="center">
              Topic
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
                {row.name}
              </TableCell>
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center">{row.fat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
