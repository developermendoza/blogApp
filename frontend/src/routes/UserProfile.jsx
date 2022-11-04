import React from "react";
import { Box, Container, Toolbar } from "@mui/material";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("userAuth"));
  console.log("user", user);
  return (
    <Box as="main">
      <Container>
        <Toolbar />
        <p>UserProfile</p>
      </Container>
    </Box>
  );
};

export default UserProfile;
