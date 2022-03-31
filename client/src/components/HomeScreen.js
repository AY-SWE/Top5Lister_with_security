import React, { useContext, useEffect } from "react";
import { GlobalStoreContext } from "../store";
import ListCard from "./ListCard.js";
import { Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";
import Button from "@mui/material/Button";

import DeleteModal from "./DeleteModal";
import NavigateBar from "./NavigateBar";
/*
    This React component lists all the top5 lists in the UI.    This is ListSelector in HW3
    
    @author Andy Yang
    @author McKilla Gorilla
*/
const HomeScreen = () => {
  const { store } = useContext(GlobalStoreContext);

  useEffect(() => {
    store.loadIdNamePairs();
  }, []);

  function handleCreateNewList() {
    store.createNewList();
  }
  let listCard = "";
  if (store) {
    listCard = (
      <List sx={{ width: "90%", left: "5%", bgcolor: "background.paper" }}>
        {store.idNamePairs.map((pair) => (
          <ListCard key={pair._id} idNamePair={pair} selected={false} />
        ))}
      </List>
    );
  }
  return (
    <div id="top5-list-selector">
      <NavigateBar />
      <div id="list-selector-list">
        {listCard}
        <DeleteModal />
      </div>
    </div>
  );
};

export default HomeScreen;
