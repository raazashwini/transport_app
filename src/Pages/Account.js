import { Box, Button, Stack, Typography } from "@mui/material";
import { flexbox } from "@mui/system";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../component/nav";

export default function Account() {
  const {state} = useLocation();
  console.log(state)
  const [drop, setDrop] = useState(0);
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
              <Typography variant="h4">
               {state.username}
              </Typography>
            </Stack><Stack spacing={2} direction="row" sx={{ mt: 2 }}>
              <Typography variant="h4">Email :</Typography>
              <Typography variant="h4">
                {state.email}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
