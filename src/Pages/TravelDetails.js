import { Box, Button, Stack, TextField, Checkbox } from "@mui/material";
import $ from "jquery";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import ApiService from '../services/ApiService';
import {saveFav} from '../services/ApiEndpoints'
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

function TravelDetails() {
  const { apiService } = ApiService();
  const [selected, setSelected] = useState([]);
  console.log(selected)
  const getLogin = () => {
    apiService({ url: saveFav, method: "post", data: selected }).then(
      (result) => {
        console.log(result)       
      }
    )
    .catch((error) => alert('login fails: user does not exist') )
  };
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
    "favorite",
  ];
  const { state } = useLocation();
  const [data, setData] = useState(state);
  const DataTable = (data1) => {
    setData(data1);
  };
  const [search, setSearch] = useState({
    from: "",
    to: "",
  });
  const handleData = (e) => {
    const nam = e.target.name;
    const val = e.target.value;
    setSearch({ ...search, [nam]: val });
  };
  // console.log(search)
  // console.log(state)

  // const handleData1 = (e) => {
  //   let data1 = [];
  //   state.map((item) => {
  //     if (e.target.value === item.from_point_name) {
  //       data1.push(item);
  //     }
  //     else if (e.target.value === "") {
  //       data1 = state;
  //     }
  //   });
  //   DataTable(data1);
  // };

  const handleSubmit = () => {
    let data1 = [];
    // console.log(search)
    state.map((item) => {
      if (
        item.from_point_name === search.from ||
        item.to_point_name === search.to
      ) {
        data1.push(item);
      }
      if (search.from === "" && search.to === item.to_point_name) {
        data1.push(item);
      }
      if (search.from === item.from_point_name && search.to === "") {
        data1.push(item);
      }
      if (search.from === "" && search.to === "") {
        data1 = state;
      }
    });
    setData(data1);
  };
  const handleClick = (event, id) => {
    console.log(id);
    if (event.target.checked) {
      setSelected([...selected, id]);
    } else {
      const data = selected.filter((selectedId) => selectedId !== id);
      setSelected(data);
    }
  };
  useEffect(()=>{
    getLogin()
  },[selected])

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
                <TextField
                  id="filled-basic"
                  label="Starting"
                  variant="filled"
                  size="small"
                  name="from"
                  sx={{ fontSize: "20px", background: "#fff" }}
                  onChange={(e) => handleData(e)}
                />
                <TextField
                  id="filled-basic"
                  label="Desitination"
                  name="to"
                  variant="filled"
                  size="small"
                  sx={{ fontSize: "20px", background: "#fff" }}
                  onChange={(e) => handleData(e)}
                />
                <Button variant="contained" onClick={() => handleSubmit()}>
                  Search
                </Button>
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
                            {row.departure_time}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.to_point_name}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.arrival_time}
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
                          <StyledTableCell align="right">
                            <Checkbox
                              {...label}
                              icon={<FavoriteBorder />}
                              checkedIcon={<Favorite />}
                              onClick={(e) => handleClick(e, row)}
                            />
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
