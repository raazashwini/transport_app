import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import Navbar from "../component/nav";

function About() {
  return (
    <React.Fragment>
      <Box className="bg-continer">
        <Navbar />
        <Typography
          sx={{ display: "flex", justifyContent: "center" }}
          variant="h1"
        >
          Contact Us
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Box
            sx={{
              minWidth: "600px",
              minHeight: "500px",
              margin: "30px",
            }}
          >
            <Typography variant="h3">Business contact information:</Typography>
            <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
              <Typography variant="h4">email :</Typography>

              <Typography variant="h4">info@transportapi.com</Typography>
            </Stack>
            <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
              <Typography variant="h4">Phone :</Typography>
              <Typography variant="h4" align="center">
                020 3290 1357
              </Typography>
            </Stack>
            <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
              <Typography variant="h4">twitter :</Typography>
              <Typography variant="h4">@TransportAPI</Typography>
            </Stack>
            <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
              <Typography variant="h4">Address :</Typography>
              <Typography variant="h4">
                Apollo House 359 Kennington Lane London
              </Typography>
            </Stack>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h2" sx={{ mt: 4 }}>
                Got a technical question? :
              </Typography>
              <Typography variant="h4" sx={{ mt: 1 }}>
                Visit our Developer portal for further technical information
                about our products and APIs.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default About;
