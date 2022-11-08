import React, { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import { db } from "../../firebase";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { authenticateUser } from "../../redux/slices/userSlice";
import {
  TextField,
  FormControl,
  Grid,
  Button,
  Container,
  FormHelperText,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useNavigate } from "react-router-dom";
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

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const addToUsersDb = async (user) => {
    const docRef = doc(db, "users", user.uid);

    const data = {
      email: user.email,
    };

    setDoc(docRef, data)
      .then((docRef) => {
        console.log("Entire Document has been updated successfully");
      })
      .catch((error) => {
        console.log(error);
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

    // addToUsersDb(submitNewUser);

    createUserWithEmailAndPassword(
      auth,
      submitNewUser.email,
      submitNewUser.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(authenticateUser(user));
        addToUsersDb(user);
        navigate("/user/profile");
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
    <Box as="main">
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
            </Grid>
            <Grid container spacing={4} style={{ marginTop: "5px" }}>
              <Grid item xs={12}>
                <p style={{ color: "grey" }}>
                  Already have an account?{" "}
                  <span style={{ textDecoration: "underline" }}>
                    <Link to="/login">LOGIN</Link>
                  </span>
                </p>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Box>
  );
};

export default Register;
