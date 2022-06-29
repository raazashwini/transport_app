import { Box, Button, Typography } from "@mui/material";
import $ from "jquery";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/nav";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function HomePage() {
  const navigate = useNavigate();
  const [data, setdata] = useState({});
  const appId = "08e7f85a";
  const appKey = "3e0935f372471d64804fed5381cdaa8d";
  const columns = [
    "Arrival Datetime",
    "Arrival Time",
    "Departure Datetime",
    "Departure Time",
    "Distance",
    "Distance Desc",
    "Duration",
  ];

  const url =
    "http://transportapi.com/v3/uk/public/journey/from/postcode:st52qd/to/postcode:ex85jf.json?service=silverrail" +
    `&app_id=${appId}&app_key=${appKey}`;

  $.getJSON(url, (data) => {
    setdata(data.routes);
  });

  // useEffect(() => {
  //   apiFunction();
  // }, []);

  return (
    <React.Fragment>
      <Box className="bg-continer">
        <Navbar />
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            marginTop: "50px",
            marginRight: "20px",
          }}
        >
          <Box sx={{ width: "850px" }}>
            <Box style={{ height: 400, width: "100%" }}>
              {data?.length && (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        {columns.map((item, i) => (
                          <StyledTableCell key={i} sx={{ fontSize: "10px" }}>
                            {item}
                          </StyledTableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.map((row, key) => (
                        <StyledTableRow
                          key={key}
                          onClick={() => {
                            navigate("travel-details", {
                              state: row.route_parts,
                            });
                          }}
                        >
                          <StyledTableCell component="th" scope="row">
                            {row.arrival_datetime}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.arrival_time}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.departure_datetime}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.departure_time}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.distance}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.distance_desc}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.duration}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
