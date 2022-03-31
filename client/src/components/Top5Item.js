import { React, useContext, useState } from "react";
import { GlobalStoreContext } from "../store";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author Andy Yang
    @author McKilla Gorilla
*/
function Top5Item(props) {
  const { store } = useContext(GlobalStoreContext);
  const [editActive, setEditActive] = useState(false);
  const [text, setText] = useState("");

  const [draggedTo, setDraggedTo] = useState(0);

  function handleKeyPress(event) {
    if (event.code === "Enter") {
      let index = event.target.id.substring("list-".length);
      let text = event.target.value;
      store.addUpdateItemTransaction(index - 1, text);
      toggleEdit();
    }
  }

  function handleToggleEdit(event) {
    event.stopPropagation();
    console.log("handleToggleEdit");
    toggleEdit();
  }
  function handleUpdateText(event) {
    setText(event.target.value);
  }

  function toggleEdit() {
    let newActive = !editActive;
    if (newActive) {
      store.setIsItemEditActive();
    }
    setEditActive(newActive);
  }

  let editStatus = false;
  if (store.isItemEditActive) {
    editStatus = true;
  }

  let { index } = props;

  let itemClass = "top5-item";
  if (draggedTo) {
    itemClass = "top5-item-dragged-to";
  }
  return (
    <ListItem
      id={"item-" + (index + 1)}
      key={props.key}
      className={itemClass}
      sx={{ display: "flex", p: 1 }}
      style={{
        fontSize: "30pt",
        width: "100%",
      }}
    >
      <Box //NUMBERS 1,2,3,4,5
        sx={{
          height: 28,
          p: 1.5,
          borderRadius: 3,
          backgroundColor: "gold",
          fontSize: 30,
        }}
      >
        <div>{index + 1 + "."}</div>
      </Box>

      <TextField
        sx={{
          p: 1,
          flexGrow: 1,
          background: "gold",
          height: 35,
          borderRadius: 3,
        }}
        required
        fullWidth
        id={"item-" + (index + 1)}
        className="top5-item"
        defaultValue={props.text}
        autoFocus
        onClick={handleToggleEdit}
        onChange={handleUpdateText}
        onKeyPress={handleKeyPress}
      />
    </ListItem>
  );
}

export default Top5Item;
