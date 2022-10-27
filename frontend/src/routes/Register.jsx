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
  Container,
} from "@mui/material";

const Register = () => {
  return (
    <Container>
      <Box component="form" sx={{ p: 3, flexGrow: 1 }}>
        <Toolbar />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl>
              <TextField helperText="" id="email" label="Email" type="email" />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <TextField
                helperText=""
                id="password"
                label="Password"
                type="password"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <TextField
                helperText=""
                id="confirmPassword"
                label="Confirm Password"
                type="password"
              />
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Register;
