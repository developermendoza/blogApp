import React from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Grid } from "@mui/material";

const Footer = () => {
  return (
    <footer style={{ marginTop: "100px" }}>
      <div style={{ background: "black", color: "#eee", padding: "50px 0" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <p>Logo</p>
          </Grid>
          <Grid item xs={12} md={6}>
            <div style={{ display: "flex" }}>
              <p>HOME</p>
              <p>ABOUT</p>
              <p>REGISTER</p>
              <p>LOGIN</p>
            </div>
          </Grid>
        </Grid>
      </div>
      <div style={{ background: "white" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <small>Copyright 2017. All Rights Reserved</small>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div>
              <FacebookOutlinedIcon />
              <TwitterIcon />
              <InstagramIcon />
              <YouTubeIcon />
            </div>
          </Grid>
        </Grid>
      </div>
    </footer>
  );
};

export default Footer;
