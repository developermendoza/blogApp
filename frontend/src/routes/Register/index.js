import React, { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import { db } from "../../firebase";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  TextField,
  FormControl,
  Grid,
  Button,
  Container,
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import styles from "./Register.module.css";

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
    db();
    const auth = getAuth();

    createUserWithEmailAndPassword(
      auth,
      submitNewUser.email,
      submitNewUser.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("userAuth", user);

        // navigate to a (private component) page where there is another form - profile -tells the user to fillout to start posting
        // save the email on the users database
        // it keeps the user logged in for 1 hour if idle
        // user/profile
        // the profile will have a form - firstname, lastname, about, avatar, email, location, social media
        // user/new-post
        // user/posts

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
      <div className={styles.registerFormWrapper}>
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  helperText=""
                  error={error !== ""}
                  id="email"
                  name="email"
                  label="Email *"
                  type="email"
                  value={newUser.email}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel error={error !== ""}>Password *</InputLabel>
                <OutlinedInput
                  id="password"
                  error={error !== ""}
                  type={showPassword ? "text" : "password"}
                  value={newUser.password}
                  name="password"
                  label="Password *"
                  autoComplete="off"
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
                />
                <FormHelperText>
                  Password should be at least 6 characters
                </FormHelperText>
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
                  sx={{
                    background: "#f64744",
                    color: "white",
                    fontSize: "18px",
                    "&:hover": {
                      background: "#F75F5C",
                    },
                  }}
                  fullWidth
                >
                  SIGN UP
                </Button>
              )}
              <p style={{ color: "red" }}>{error}</p>
            </Grid>
            <Grid item xs={12}>
              <p className={styles.registerFormOr}>OR</p>
              <div className={styles.registerFormDevider}></div>
            </Grid>
          </Grid>
          <Grid container spacing={4} style={{ marginTop: "10px" }}>
            <Grid item xs={4} style={{ textAlign: "right" }}>
              <GoogleIcon
                sx={{ fontSize: "40px", cursor: "pointer", color: "#db3236" }}
                className={`${styles.registerSocialIcon} ${styles.google}`}
              />
            </Grid>
            <Grid item xs={4}>
              <FacebookIcon
                sx={{ fontSize: "40px", cursor: "pointer", color: "#3b5998" }}
              />
            </Grid>
            <Grid item xs={4} style={{ textAlign: "left" }}>
              <LinkedInIcon
                sx={{ fontSize: "40px", cursor: "pointer", color: "#0a66c2" }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={4} style={{ marginTop: "5px" }}>
            <Grid item xs={12}>
              <p style={{ color: "grey" }}>
                Already have an account?{" "}
                <span style={{ textDecoration: "underline" }}>LOGIN</span>
              </p>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Register;
