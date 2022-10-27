import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import { Link } from "react-router-dom";

const drawerWidth = 240;
const navItems = [
  <Link style={{ color: "grey" }} id="home" to="/">
    Home
  </Link>,
  <Link style={{ color: "grey" }} id="about" to="/about">
    About
  </Link>,
  <Link style={{ color: "grey" }} id="register" to="/register">
    Register
  </Link>,
  <BasicMenu id="basicMenu" />,
];

function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div
        style={{ color: "grey" }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        CATEGORIES
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Music</MenuItem>
        <MenuItem onClick={handleClose}>Lifestyle</MenuItem>
        <MenuItem onClick={handleClose}>Fashion</MenuItem>
        <MenuItem onClick={handleClose}>Culture</MenuItem>
        <MenuItem onClick={handleClose}>Fitness</MenuItem>
        <MenuItem onClick={handleClose}>Travel</MenuItem>
        <MenuItem onClick={handleClose}>Art</MenuItem>
        <MenuItem onClick={handleClose}>Agriculture</MenuItem>
        <MenuItem onClick={handleClose}>Design</MenuItem>
        <MenuItem onClick={handleClose}>Food</MenuItem>
        <MenuItem onClick={handleClose}>Politics</MenuItem>
        <MenuItem onClick={handleClose}>Entertainment</MenuItem>
        <MenuItem onClick={handleClose}>Sport</MenuItem>
        <MenuItem onClick={handleClose}>Health</MenuItem>
      </Menu>
    </div>
  );
}

const Navbar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.props.id} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" style={{ background: "white" }}>
        <Container>
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button key={item.props.id} sx={{ color: "#fff" }}>
                  {item}
                </Button>
              ))}
            </Box>
            <SearchIcon style={{ color: "black" }} fontSize="large" />
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
