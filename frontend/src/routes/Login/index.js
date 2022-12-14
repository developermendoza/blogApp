import React, { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { db } from "../../firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getDoc, setDoc, doc } from "firebase/firestore";
import {
  TextField,
  FormControl,
  Grid,
  Button,
  Container,
  FormHelperText,
  Box,
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
import styles from "./Login.module.css";

import { useDispatch } from "react-redux";
import { authenticateUser } from "../../redux/slices/userSlice";
import { useNavigate, Link } from "react-router-dom";

const initialStateNewUser = {
  email: "",
  password: "",
};
const Login = () => {
  const [user, setUser] = useState(initialStateNewUser);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const doesUserExist = async (user) => {
    const docRef = doc(db(), "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return;
    } else {
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
    }
  };

  const loginWithGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        doesUserExist(user);

        dispatch(authenticateUser(user));
        navigate("/user/profile");
        setError("");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        setError(email);
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        setError(credential);
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

    const submitUser = {
      email: user.email,
      password: user.password,
    };
    const auth = getAuth();

    signInWithEmailAndPassword(auth, submitUser.email, submitUser.password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(authenticateUser(user));
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
        <div className={styles.loginFormWrapper}>
          <h1>Login</h1>
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
                    value={user.email}
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
                    value={user.password}
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
                    Login
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
                    Login
                  </Button>
                )}
                <p style={{ color: "red" }}>{error}</p>
              </Grid>
              <Grid item xs={12}>
                <p className={styles.loginFormOr}>OR</p>
                <div className={styles.loginFormDevider}></div>
              </Grid>
            </Grid>
            <Grid container spacing={4} style={{ marginTop: "10px" }}>
              <Grid item xs={4} style={{ textAlign: "right" }}>
                <GoogleIcon
                  sx={{ fontSize: "40px", cursor: "pointer", color: "#db3236" }}
                  className={`${styles.loginSocialIcon} ${styles.google}`}
                  onClick={loginWithGoogle}
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
                  Don't have an account?{" "}
                  <span style={{ textDecoration: "underline" }}>
                    <Link to="/register">Register</Link>
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

export default Login;
