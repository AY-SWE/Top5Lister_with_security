import { useContext, useState } from "react";
import { GlobalStoreContext } from "../store";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author Andy Yang
    @author McKilla Gorilla
*/
function ListCard(props) {
  const { store } = useContext(GlobalStoreContext);
  const [editActive, setEditActive] = useState(false);
  const [text, setText] = useState("");
  const { idNamePair } = props;

  let publishStatus = "Edit";
  if (idNamePair.publishStatus) {
    publishStatus = "Published";
  }

  function handleLoadList(event, id) {
    if (!event.target.disabled) {
      // CHANGE THE CURRENT LIST
      store.setCurrentList(id);
    }
  }

  function handleToggleEdit(event) {
    event.stopPropagation();
    setText(idNamePair.name); //adding this will fix the error where if you edit a listname and made no change and press enter an error shows up
    toggleEdit();
  }

  function toggleEdit() {
    let newActive = !editActive;
    if (newActive) {
      store.setIsListNameEditActive();
    }
    setEditActive(newActive);
  }

  async function handleDeleteList(event, id) {
    event.stopPropagation();
    console.log("delete button pressed");
    store.markListForDeletion(id);
  }

  function handleKeyPress(event) {
    if (event.code === "Enter") {
      let id = event.target.id.substring("list-".length);
      store.changeListName(id, text);
      toggleEdit();
    }
  }
  function handleUpdateText(event) {
    setText(event.target.value);
  }

  let cardElement = (
    <ListItem
      id={idNamePair._id}
      key={idNamePair._id}
      sx={{ marginTop: "1px", display: "flex", p: 1 }}
      style={{
        fontSize: "24pt",
        width: "100%",
      }}
    >
      <Box sx={{ p: 1, flexGrow: 1 }}>
        <Box>{idNamePair.name}</Box>
        <Box sx={{ p: 1, fontSize: "10pt" }}>
          {"By: " + idNamePair.username}
        </Box>
        <Box
          sx={{ p: 1, fontSize: "10pt" }}
          button
          onClick={(event) => {
            handleLoadList(event, idNamePair._id);
          }}
        >
          {publishStatus}
        </Box>
      </Box>

      <Box sx={{ p: 1 }}>
        <IconButton onClick={handleToggleEdit} aria-label="like">
          <ThumbUpAltOutlinedIcon style={{ fontSize: "30pt" }} />
        </IconButton>
        <Box sx={{ p: 1, fontSize: "10pt" }}>Views: {idNamePair.views}</Box>
      </Box>

      <Box sx={{ p: 1 }}>{idNamePair.likes.length}</Box>

      <Box sx={{ p: 1 }}>
        <IconButton onClick={handleToggleEdit} aria-label="dislike">
          <ThumbDownAltOutlinedIcon style={{ fontSize: "30pt" }} />
        </IconButton>
      </Box>
      <Box sx={{ p: 1 }}>{idNamePair.likes.length}</Box>

      <Box sx={{ p: 1, fontSize: "1pt" }}>
        <IconButton
          onClick={(event) => {
            handleDeleteList(event, idNamePair._id);
          }}
          aria-label="delete"
        >
          <DeleteOutlineOutlinedIcon style={{ fontSize: "30pt" }} />
        </IconButton>

        <Box sx={{ p: 1, flexGrow: 1, fontSize: "1pt" }}>
          <IconButton onClick={handleToggleEdit} aria-label="expand">
            <ExpandMoreOutlinedIcon style={{ fontSize: "30pt" }} />
          </IconButton>
        </Box>
      </Box>
    </ListItem>
  );

  return cardElement;
}

export default ListCard;
