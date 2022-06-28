import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { flexbox } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../component/nav";
import ApiService from '../services/ApiService';
import {update} from '../services/ApiEndpoints';

export default function Account() {
    const { apiService } = ApiService();
  const {state} = useLocation();
  const [data , setData] = useState(state)
  const [updateprofile , setUpdateProfile] = useState({
    email:"",
    username:'',
    curEmail:data.email
  })

  console.log(updateprofile)
  const handleData = (e) =>{
    const nam = e.target.name;
    const val = e.target.value;
    setUpdateProfile({...updateprofile,[nam]:val});
  }
  const handleSubmit = (e) =>{
    apiService({ url: update, method: "post", data: updateprofile }).then(
        (result) => {
            
            setData(updateprofile)
            setEdit(0)
        }
      )
  }
  console.log(state)
  const [edit, setEdit] = useState(0);

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
          <Box sx={{ width: "750px" }}>
            <Typography
              variant="H1"
              sx={{ fontSize: "50px", color: "#000", fontWeight: 700 }}
            >
              Account Details
            </Typography>
            <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
              <Typography variant="h4">UserName :</Typography>
              {edit ? <TextField id="filled-basic" name='username' label="Username" variant="filled" onChange={(e) =>handleData(e)}/> : <Typography variant="h4">
               {data?.username}
              </Typography>}
            </Stack><Stack spacing={2} direction="row" sx={{ mt: 2 }}>
              <Typography variant="h4">Email :</Typography>
              {edit ? <TextField id="filled-basic" name='email' label="Email" variant="filled" onChange={(e) =>handleData(e)}/> : <Typography variant="h4">
               {data?.email}
              </Typography>}
            </Stack>
            {edit ?  <Button
                  variant="contained"
                  sx={{ color: "#000",margin:'20px' }}
                  size="large"
                  onClick={() =>handleSubmit()}
                >
                  Submit
                </Button>
                : ''}
            <Button
                  variant="contained"
                  sx={{ color: "#000",margin:'20px' }}
                  size="large"
                  onClick={() =>setEdit(1)}
                >
                  Edit
                </Button>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
