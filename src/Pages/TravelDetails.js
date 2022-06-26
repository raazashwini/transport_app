import { Box, Button, Stack, TextField, Typography } from "@mui/material";
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
import { useLocation } from "react-router-dom";
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

function TravelDetails() {
  const columns = [
    "Mode",
    "Starting Location",
    "Starting Time",
    "Ending Location",
    "Ending Time",
    "Distance",
    "Distance Desc",
    "Duration",
  ];
  const { state } = useLocation();
  const [data, setData] = useState(state);
  const DataTable = (data1) => {
    setData(data1);
  };

  const handleData = (e) => {
    let data1 = [];
    state.map((item) => {
      if (e.target.value === item.to_point_name) {
        data1.push(item);
      }
      if (e.target.value === "") {
        data1 = state;
      }
    });
    DataTable(data1);
  };

  //   useEffect(() => {
  //     DataTable();
  //   }, [data]);

  return (
    <React.Fragment>
      <Box className="bg-continer">
        <Navbar />
        <Box sx={{ display: "flex", justifyContent: "end", margin: "30px" }}>
          <Box sx={{ width: "850px" }}>
            <Box style={{ height: 400, width: "100%" }}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="space-around"
                sx={{ my: 2 }}
              >
                <Typography variant="h2"> Top 5 modes to Travel</Typography>
                <TextField
                  id="filled-basic"
                  label="Search Desitination"
                  variant="outlined"
                  onChange={(e) => handleData(e)}
                />
              </Stack>

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
                  {data?.length ? (
                    <TableBody>
                      {data?.slice(0, 6).map((row, key) => (
                        <StyledTableRow key={key}>
                          <StyledTableCell component="th" scope="row">
                            {row.mode}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {row.from_point_name}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.arrival_time}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.to_point_name}
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
                  ) : (
                    <TableBody>
                      <StyledTableRow>No Data Found</StyledTableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default TravelDetails;
