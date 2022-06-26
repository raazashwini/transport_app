import { Box, Button, Typography } from "@mui/material";
import { flexbox } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/nav";

export default function HomePage() {
  const navigate = useNavigate();
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
              sx={{ fontSize: "20px", color: "green", fontWeight: 500 }}
            >
              Travel for Heaven
            </Typography>
            <Typography
              variant="H1"
              sx={{ fontSize: "50px", color: "#000", fontWeight: 700 }}
            >
              We Make Your Journey Comfortable
            </Typography>
            <Typography
              sx={{ fontSize: "25px", color: "#000", fontWeight: 500 }}
            >
              Make your journey more Comfortable and easily accessible and we
              are here for you!
            </Typography>
            <Box sx={{ display: "flex" }}>
              {drop ? (
                <Button
                  variant="outlined"
                  sx={{ color: "#000" }}
                  size="large"
                  onClick={() => setDrop(0)}
                >
                  Read Less
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  sx={{ color: "#000" }}
                  size="large"
                  onClick={() => setDrop(1)}
                >
                  Read More
                </Button>
              )}
            </Box>
            {drop === 1 && (
              <Box
                sx={{
                  background: "#849dbb7d",
                  marginTop: "10px",
                  padding: "10px",
                  marginBottom: "50px",
                }}
              >
                <Typography
                  sx={{ fontSize: "20px", color: "#000", fontWeight: 500 }}
                >
                  There are numerous times when we have been extremely excited
                  about a journey, whether it’s a long one or a short one. The
                  essential part in any journey is played by the transportation
                  system of your city or country.
                  <br />
                  <br />
                  Here we design to perfection and help you get the all mode of
                  your land transportation like bus and train . Apart from this,
                  you can get the actual fare from one point to another and get
                  the time duration of the journey. These features are designed
                  to help users to save and manage time in their daily hustle.
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
