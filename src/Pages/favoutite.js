import { Box, Button, Stack, TextField, Checkbox } from "@mui/material";
import $ from "jquery";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import ApiService from '../services/ApiService';
import {getfav} from '../services/ApiEndpoints'
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
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

function Favoutite() {
  const { apiService } = ApiService();
  const [selected, setSelected] = useState([]);
  const getLogin = () => {
    apiService({ url: getfav, method: "get" }).then(
      (result) => {
       setSelected(result)    
      }
    )
    .catch((error) => alert('login fails: user does not exist') )
  };

 const favData = Object.values(selected.reduce((c,e) =>{
  if (!c[e.ending_location]) c[e.ending_location] =e;
  return c;
 },{}))
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
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

useEffect(()=>{
    getLogin()
},[])


  return (
    <React.Fragment>
      <Box className="bg-continer">
        <Navbar />
        <Box sx={{ display: "flex", justifyContent: "end", margin: "30px" }}>
          <Box sx={{ width: "850px" }}>
            

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
                  {favData?.length ? (
                    <TableBody>
                      {favData?.map((row, key) => (
                        <StyledTableRow key={key}>
                          <StyledTableCell component="th" scope="row">
                            {row.mode}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {row.starting_location}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.starting_time}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.ending_location}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.ending_time}
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
    </React.Fragment>
  );
}

export default Favoutite;
