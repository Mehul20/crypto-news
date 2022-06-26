import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { db } from "../firebase-config";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

function createData(name, link, desc) {
  return { name, link, desc };
}

export default function TableWithoutLogin() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    loop();
  }, []);

  let temp = [];

  const loginAlertHandler = () => {
    alert("Please login to upvote or add articles");
  };

  async function loop() {
    const querySnapshot = await getDocs(collection(db, "table"));
    console.log(querySnapshot);
    // querySnapshot.forEach((doc) => {
    //   temp.push(
    //     createData(
    //       doc.data().Name,
    //       doc.data().Upvotes,
    //       doc.data().Description[0]
    //     )
    //   );
    // });
    for (let i = 0; i < 3; i++) {
      console.log(querySnapshot.docs[i].data());
      temp.push(
        createData(
          querySnapshot.docs[i].data().Name,
          querySnapshot.docs[i].data().Upvotes,
          querySnapshot.docs[i].data().Description[0]
        )
      );
    }
    setRows(temp);
    temp = [];
    console.log(rows);
  }

  return (
    // <div>
    //   <TableContainer component={Paper}>
    //     <Table sx={{ minWidth: 650 }} aria-label="simple table">
    //       <TableHead>
    //         <TableRow>
    //           <TableCell style={{ width: "50%" }}>Article Name</TableCell>
    //           <TableCell style={{ width: "15%" }} align="center">
    //             Upvotes
    //           </TableCell>
    //           <TableCell style={{ width: "35%" }} align="center">
    //             Topic
    //           </TableCell>
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {rows.map((row) => (
    //           <TableRow
    //             key={row.name}
    //             sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    //           >
    //             <TableCell component="th" scope="row">
    //               {row.name}
    //             </TableCell>
    //             <TableCell align="center">
    //               <div
    //                 style={{
    //                   display: "flex",
    //                   alignItems: "center",
    //                 }}
    //               >
    //                 <span>{row.link}</span>
    //                 <ArrowCircleUpIcon onClick={loginAlertHandler} />
    //               </div>
    //             </TableCell>
    //             <TableCell align="center">{row.desc}</TableCell>
    //           </TableRow>
    //         ))}
    //       </TableBody>
    //     </Table>
    //   </TableContainer>
    // </div>
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead className="tableheaddesign">
          <TableRow>
            <TableCell style={{ width: "50%" }} className="header">
              <div className="header"> Article Name </div>
            </TableCell>
            <TableCell style={{ width: "20%" }} align="left" className="header">
              <div className="header"> Tags </div>
            </TableCell>
            <TableCell style={{ width: "15" }} align="left" className="header">
              <div className="header"> Upvotes </div>
            </TableCell>
            <TableCell style={{ width: "15%" }} align="left" className="header">
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

              <TableCell align="center">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span>{row.link}</span>
                  <ArrowCircleUpIcon onClick={loginAlertHandler} />
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
  );
}
