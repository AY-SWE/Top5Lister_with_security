import { useContext } from "react";
import { GlobalStoreContext } from "../store";
import { Typography } from "@mui/material";

import Button from "@mui/material/Button";

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author Andy Yang
    @author McKilla Gorilla
*/
function Statusbar() {
  const { store } = useContext(GlobalStoreContext);
  let text = "";

  function handleCreateNewList() {
    store.createNewList();
  }
  if (store.currentModeActive == "home") {
    text = (
      <div id="list-selector-heading">
        <Button
          style={{ fontSize: "90px", color: "black" }}
          aria-label="add"
          id="add-list-button"
          onClick={handleCreateNewList}
        >
          +
        </Button>
        <Typography variant="h2">Your Lists</Typography>
      </div>
    );
  }
  return (
    <div id="top5-statusbar">
      <Typography variant="h4">{text}</Typography>
    </div>
  );
}

export default Statusbar;
