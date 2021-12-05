import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../auth";
import { GlobalStoreContext } from "../store";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

import TextField from "@mui/material/TextField";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FunctionsOutlinedIcon from "@mui/icons-material/FunctionsOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";

import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Button from "@mui/material/Button";

export default function NavigateBar() {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const history = useHistory();

  const handleSortByMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortByMenuClose = () => {
    setAnchorEl(null);
  };

  function handleKeyPress(event) {
    // if (event.code === "Enter") {
    //   let id = event.target.id.substring("list-".length);
    //   store.changeListName(id, text);
    //   toggleEdit();
    // }
    console.log("handleKeyPressSearchBar");
  }
  function handleUpdateText(event) {
    //setText(event.target.value);
    console.log("handleUpdateTextSearchBar");
  }

  const menuId = "sortby-menu";

  const sortByMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleSortByMenuClose}
    >
      <MenuItem onClick={handlePublishDateNewest}>
        Publish Date (Newest)
      </MenuItem>
      <MenuItem onClick={handlePublishDateOldest}>
        Publish Date (Oldest)
      </MenuItem>
      <MenuItem onClick={handleViews}>Views</MenuItem>
      <MenuItem onClick={handleLikesMenuItem}>Likes</MenuItem>
      <MenuItem onClick={handleDislikesMenuItem}>Dislikes</MenuItem>
    </Menu>
  );

  let menu = sortByMenu;

  let location = useLocation();

  function HeaderView() {
    console.log(location.pathname);
  }
  // function getAccountMenu(loggedIn) {
  //     return <AccountCircle />;

  // }

  function handleHome() {
    //history.push("/login/");
    store.homeButtonActive();
  }
  function handleAllLists() {
    history.push("/login/");
  }
  function handleUsers() {
    history.push("/login/");
  }
  function handleCommunity() {
    history.push("/login/");
  }

  function handlePublishDateNewest() {
    history.push("/login/");
  }
  function handlePublishDateOldest() {
    history.push("/login/");
  }
  function handleViews() {
    history.push("/login/");
  }
  function handleLikesMenuItem() {
    history.push("/login/");
  }
  function handleDislikesMenuItem() {
    history.push("/login/");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#a19e9e" }}>
        <Toolbar>
          <Box sx={{ width: 280 }}>
            <Button style={{ color: "black" }} onClick={handleHome}>
              <HomeOutlinedIcon
                fontSize="large"
                aria-label="home"
                id="home-list-button"
              />
            </Button>

            <Button style={{ color: "black" }} onClick={handleAllLists}>
              <GroupsOutlinedIcon
                fontSize="large"
                aria-label="allLists"
                id="all-list-button"
              />
            </Button>

            <Button style={{ color: "black" }} onClick={handleUsers}>
              <PersonOutlineOutlinedIcon
                fontSize="large"
                aria-label="users"
                id="users-list-button"
              />
            </Button>
            <Button style={{ color: "black" }} onClick={handleCommunity}>
              <FunctionsOutlinedIcon
                fontSize="large"
                aria-label="community"
                id="community-list-button"
              />
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <TextField
              style={{ width: 350 }}
              required
              fullWidth
              id="searchBar"
              name="name"
              className="search"
              onKeyPress={handleKeyPress}
              onChange={handleUpdateText}
              placeholder="Search"
              inputProps={{ style: { fontSize: 13 } }}
              autoFocus
              sx={{ background: "white" }}
            />
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Typography sx={{ color: "black" }} variant="button">
              Sort By
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button style={{ color: "black" }} onClick={handleSortByMenuOpen}>
              <SortOutlinedIcon
                fontSize="large"
                aria-label="sortBy"
                aria-haspopup="true"
                aria-controls={menuId}
                id="sortBy-list-button"
              />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {menu}
    </Box>
  );
}
