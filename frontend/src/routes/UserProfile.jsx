import React from "react";
import { Box, Container, Toolbar } from "@mui/material";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <Box as="main">
      <Container>
        <Toolbar />
        <p>
          <b>user id:</b> {user.uid}
        </p>
        <p>
          <b>user email:</b> {user.email}
        </p>
      </Container>
    </Box>
  );
};

export default UserProfile;
