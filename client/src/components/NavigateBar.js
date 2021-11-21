import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../auth";
import { GlobalStoreContext } from "../store";
import EditToolbar from "./EditToolbar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Button from "@mui/material/Button";

export default function NavigateBar() {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const history = useHistory();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    auth.logoutUser();
  };

  function handleWelcomeLogin() {
    history.push("/login/");
  }
  function handleWelcomeRegister() {
    history.push("/register/");
  }
  function handleWelcomeGuestLogin() {
    history.push("/login/");
  }

  const menuId = "primary-search-account-menu";
  const loggedOutMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link to="/login/">Login</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to="/register/">Create New Account</Link>
      </MenuItem>
    </Menu>
  );
  const loggedInMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  let editToolbar = "";
  let menu = loggedOutMenu;
  if (auth.loggedIn) {
    menu = loggedInMenu;
    if (store.currentList) {
      editToolbar = <EditToolbar />;
    }
  }

  let location = useLocation();

  function HeaderView() {
    console.log(location.pathname);
  }
  // function getAccountMenu(loggedIn) {
  //     return <AccountCircle />;

  // }

  function getAccountMenu(loggedIn) {
    let userInitials = auth.getUserInitials();
    console.log("userInitials: " + userInitials);
    if (loggedIn) return <div>{userInitials}</div>;
    else return <AccountCircle />;
  }
  if (location.pathname == "/" && !auth.loggedIn) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: "#a19e9e" }}>
          <Toolbar>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <Link style={{ textDecoration: "none", color: "gold" }} to="/">
                T<sup>5</sup>L
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 1 }}>{editToolbar}</Box>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button style={{ color: "#850a96" }} onClick={handleWelcomeLogin}>
                Login
              </Button>
              <Button
                style={{ color: "#850a96" }}
                onClick={handleWelcomeRegister}
              >
                Create Account
              </Button>
              <Button
                style={{ color: "#850a96" }}
                onClick={handleWelcomeGuestLogin}
              >
                Continue As Guest
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        {menu}
      </Box>
    );
  } else {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: "#a19e9e" }}>
          <Toolbar>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <Link style={{ textDecoration: "none", color: "gold" }} to="/">
                T<sup>5</sup>L
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 1 }}>{editToolbar}</Box>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {getAccountMenu(auth.loggedIn)}
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {menu}
      </Box>
    );
  }
}
