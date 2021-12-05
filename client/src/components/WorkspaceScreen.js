import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../auth";

import Top5Item from "./Top5Item.js";
import List from "@mui/material/List";
import { Typography } from "@mui/material";

import Button from "@mui/material/Button";
import { GlobalStoreContext } from "../store/index.js";

import NavigateBar from "./NavigateBar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";

/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);

  const [editActive, setEditActive] = useState(false);
  const [text, setText] = useState("");

  function handleToggleEdit(event) {
    event.stopPropagation();
    setText(store.currentList.name); //adding this will fix the error where if you edit a listname and made no change and press enter an error shows up
    toggleEdit();
  }

  function toggleEdit() {
    let newActive = !editActive;
    if (newActive) {
      store.setIsListNameEditActive();
    }
    setEditActive(newActive);
  }

  function handleSave(event) {
    let id = store.currentList._id;
    store.changeListName(id, text);
    toggleEdit();
  }

  function handleUpdateText(event) {
    setText(event.target.value);
  }

  const history = useHistory();

  if (!auth.loggedIn) {
    store.currentList = null;
    history.push("/");
  }
  // else{
  //     history.push("/top5list/" + store.currentList._id);
  // }

  let editItems = "";
  if (store.currentList) {
    editItems = (
      <Container id="edit-items">
        <TextField
          style={{ width: 350 }}
          onChange={handleUpdateText}
          required
          fullWidth
          id="listName"
          name="name"
          placeholder=""
          inputProps={{ style: { fontSize: 15 } }}
          defaultValue={store.currentList.name}
          autoFocus
          sx={{ background: "white" }}
        />

        <List
          id="edit-items2"
          sx={{ width: "100%", bgcolor: "background.paper" }}
        >
          {store.currentList.items.map((item, index) => (
            <Top5Item
              key={"top5-item-" + (index + 1)}
              text={item}
              index={index}
            />
          ))}
        </List>

        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Button
            style={{
              color: "black",
              position: "absolute",
              right: "1%",
              top: "88%",
              borderRadius: 8,
            }}
            disabled={true}
            variant="contained"
            size="large"
          >
            Publish
          </Button>

          <Button
            style={{
              color: "black",
              position: "absolute",
              right: "15%",
              top: "88%",
              borderRadius: 8,
            }}
            variant="contained"
            size="large"
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </Container>
    );
  }
  return (
    <div id="top5-workspace">
      <div id="workspace-edit">{editItems}</div>
      <NavigateBar />
    </div>
  );
}

export default WorkspaceScreen;
