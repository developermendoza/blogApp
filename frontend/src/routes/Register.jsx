import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {
  TextField,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Grid,
  Item,
  Button,
  Container,
} from "@mui/material";

const Register = () => {
  return (
    <Container maxWidth="sm">
      <Toolbar />
      <div
        style={{
          width: "500px",
          padding: "40px 40px 80px 40px",
          margin: "auto",
          background: "white",
          border: "#e5e5e5 1px solid",
          borderRadius: "5px",
          marginTop: "100px",
        }}
      >
        <h1>Create Account</h1>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                fullWidth
                helperText=""
                id="email"
                label="Email"
                type="email"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                helperText=""
                id="password"
                label="Password"
                type="password"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                helperText=""
                id="confirmPassword"
                label="Confirm Password"
                type="password"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              style={{
                background: "#f64744",
                color: "white",
                fontSize: "18px",
              }}
              fullWidth
            >
              SIGN UP
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Register;
