import React, { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import { db } from "../firebase";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  TextField,
  FormControl,
  Grid,
  Button,
  Container,
  fabClasses,
  formLabelClasses,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";

db();

const initialStateNewUser = {
  email: "",
  password: "",
};
const Register = () => {
  const [newUser, setNewUser] = useState(initialStateNewUser);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

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
        console.log("user: ", user);

        // navigate to a (private component) page where there is another form - profile -tells the user to fillout to start posting
        // save the email on the users database
        // it keeps the user logged in for 1 hour if idle
        // /profile
        // /new-post

        setNewUser(initialStateNewUser);
        setError("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
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
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={newUser.password}
                  name="password"
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
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
