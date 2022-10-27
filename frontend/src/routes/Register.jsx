import React, { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { db } from "../firebase";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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

db();

const Register = () => {
  const initialStateNewUser = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [newUser, setNewUser] = useState(initialStateNewUser);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    if (newUser.password !== newUser.confirmPassword) {
      setLoading(false);
      return setError("Passwords do not match");
    }

    const submitNewUser = {
      email: newUser.email,
      password: newUser.password,
    };
    const auth = getAuth();

    createUserWithEmailAndPassword(
      auth,
      submitNewUser.email,
      submitNewUser.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
        setNewUser(initialStateNewUser);
      });
  };

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
        <form action="" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  helperText=""
                  error={error !== ""}
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  value={newUser.email}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  helperText=""
                  id="password"
                  error={error !== ""}
                  name="password"
                  label="Password"
                  type="password"
                  value={newUser.password}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  helperText=""
                  id="confirmPassword"
                  error={error !== ""}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={newUser.confirmPassword}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {loading ? (
                <LoadingButton
                  style={{
                    fontSize: "18px",
                  }}
                  loading
                  fullWidth
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="outlined"
                >
                  SIGN UP
                </LoadingButton>
              ) : (
                <Button
                  type="submit"
                  style={{
                    background: "#f64744",
                    color: "white",
                    fontSize: "18px",
                  }}
                  fullWidth
                >
                  SIGN UP
                </Button>
              )}
              <p style={{ color: "red" }}>{error}</p>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Register;
